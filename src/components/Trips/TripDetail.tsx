import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import { storage } from '@/services/storage';
import { Trip, Expense } from '@/types';
import { CATEGORIES } from '@/types';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import './Trips.css';

export function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (id) {
      const t = storage.getTrips().find(t => t.id === id);
      if (t) {
        setTrip(t);
        setExpenses(storage.getExpensesByTrip(id));
      }
    }
  }, [id]);

  const handleDeleteExpense = (expenseId: string) => {
    if (confirm('Delete this expense?')) {
      storage.deleteExpense(expenseId);
      setExpenses(storage.getExpensesByTrip(id!));
    }
  };

  const getCategoryInfo = (catId: string) => {
    return CATEGORIES.find(c => c.id === catId) || CATEGORIES[8];
  };

  if (!trip) return <div className="page-loading">Loading...</div>;

  return (
    <div className="trip-detail-page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/trips')}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2>{trip.name}</h2>
          <p className="trip-subtitle">{trip.vehicleName}</p>
        </div>
      </div>

      <Dashboard tripId={trip.id} />

      <div className="expenses-section">
        <div className="section-header">
          <h3>Expenses</h3>
          <button className="btn-primary btn-sm" onClick={() => navigate(`/add-expense?tripId=${trip.id}`)}>
            <Plus size={16} /> Add
          </button>
        </div>

        {expenses.length === 0 ? (
          <p className="empty-text">No expenses yet</p>
        ) : (
          <div className="expenses-list">
            {expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense, idx) => {
              const cat = getCategoryInfo(expense.category);
              return (
                <div key={expense.id} className="expense-item slide-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="expense-icon" style={{ background: cat.color + '30' }}>
                    {cat.icon}
                  </div>
                  <div className="expense-info">
                    <span className="expense-category">{cat.label}</span>
                    <span className="expense-notes">{expense.notes || '-'}</span>
                    <span className="expense-date">{new Date(expense.date).toLocaleDateString('en-AU')}</span>
                  </div>
                  <div className="expense-amount">${expense.amount.toFixed(2)}</div>
                  <button className="btn-icon danger" onClick={() => handleDeleteExpense(expense.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

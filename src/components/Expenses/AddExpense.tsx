import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import { storage } from '@/services/storage';
import { Expense, CATEGORIES, Category } from '@/types';
import './Expenses.css';

export function AddExpense() {
  const [searchParams] = useSearchParams();
  const tripIdParam = searchParams.get('tripId');
  const navigate = useNavigate();
  
  const trips = storage.getTrips();
  const [form, setForm] = useState({
    tripId: tripIdParam || (trips[0]?.id || ''),
    amount: '',
    category: 'fuel' as Category,
    notes: '',
    date: new Date().toISOString().split('T')[0],
    receiptPhoto: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tripId || !form.amount) return;

    const expense: Expense = {
      id: storage.generateId(),
      tripId: form.tripId,
      amount: parseFloat(form.amount),
      category: form.category,
      notes: form.notes,
      date: form.date,
      receiptPhoto: form.receiptPhoto || undefined,
      createdAt: Date.now(),
    };

    storage.addExpense(expense);
    navigate(`/trips/${form.tripId}`);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, receiptPhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="expense-form-page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2>Add Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-card slide-in">
        <div className="form-group">
          <label>Trip</label>
          <select
            value={form.tripId}
            onChange={e => setForm({ ...form, tripId: e.target.value })}
            required
          >
            <option value="">Select a trip</option>
            {trips.map(trip => (
              <option key={trip.id} value={trip.id}>{trip.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="category-grid">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`category-btn ${form.category === cat.id ? 'active' : ''}`}
                onClick={() => setForm({ ...form, category: cat.id })}
                style={{ '--cat-color': cat.color } as React.CSSProperties}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes (optional)</label>
          <textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="Add notes..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Receipt Photo (optional)</label>
          <div className="photo-upload">
            {form.receiptPhoto ? (
              <div className="photo-preview">
                <img src={form.receiptPhoto} alt="Receipt" />
                <button type="button" className="btn-remove-photo" onClick={() => setForm({ ...form, receiptPhoto: '' })}>
                  ✕
                </button>
              </div>
            ) : (
              <label className="photo-btn">
                <Camera size={24} />
                <span>Add Photo</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
              </label>
            )}
          </div>
        </div>

        <button type="submit" className="btn-primary btn-full">
          <Save size={18} /> Add Expense
        </button>
      </form>
    </div>
  );
}

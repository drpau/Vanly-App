import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { storage } from '@/services/storage';
import { CATEGORIES, Category } from '@/types';
import { TrendingUp, DollarSign, PieChart as PieIcon } from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  tripId?: string;
}

export function Dashboard({ tripId }: DashboardProps) {
  const [expenses, setExpenses] = useState(tripId ? storage.getExpensesByTrip(tripId) : storage.getExpenses());
  
  useEffect(() => {
    setExpenses(tripId ? storage.getExpensesByTrip(tripId) : storage.getExpenses());
  }, [tripId]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const categoryData = CATEGORIES.map(cat => ({
    name: cat.label,
    value: expenses.filter(e => e.category === cat.id).reduce((sum, e) => sum + e.amount, 0),
    icon: cat.icon,
    color: cat.color,
  })).filter(d => d.value > 0);

  // Weekly spending
  const getWeeklyData = () => {
    const weeks: Record<string, number> = {};
    expenses.forEach(e => {
      const date = new Date(e.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const key = weekStart.toISOString().split('T')[0];
      weeks[key] = (weeks[key] || 0) + e.amount;
    });
    return Object.entries(weeks)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-8)
      .map(([date, amount]) => ({ date: new Date(date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }), amount }));
  };

  const weeklyData = getWeeklyData();
  const topCategory = categoryData.length > 0 ? categoryData.reduce((a, b) => a.value > b.value ? a : b) : null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <DollarSign size={24} className="stat-icon" />
          <div className="stat-content">
            <span className="stat-label">Total Spent</span>
            <span className="stat-value">${total.toFixed(2)}</span>
          </div>
        </div>
        {topCategory && (
          <div className="stat-card">
            <TrendingUp size={24} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-label">Top Category</span>
              <span className="stat-value">{topCategory.icon} {topCategory.name}</span>
            </div>
          </div>
        )}
      </div>

      {categoryData.length > 0 && (
        <div className="widget-card slide-in">
          <div className="widget-header">
            <PieIcon size={20} />
            <h3>Spending by Category</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${Number(value).toFixed(2)}`}
                  contentStyle={{ background: 'var(--surface)', border: 'none', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="category-legend">
            {categoryData.map((cat, i) => (
              <div key={i} className="legend-item">
                <span className="legend-color" style={{ background: cat.color }} />
                <span className="legend-label">{cat.icon} {cat.name}</span>
                <span className="legend-value">${cat.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {weeklyData.length > 1 && (
        <div className="widget-card slide-in">
          <div className="widget-header">
            <TrendingUp size={20} />
            <h3>Spending Over Time</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} contentStyle={{ background: 'var(--surface)', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="amount" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {categoryData.length === 0 && (
        <div className="empty-state">
          <p>No expenses yet. Start tracking!</p>
        </div>
      )}
    </div>
  );
}

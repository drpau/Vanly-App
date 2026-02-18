import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { storage } from '@/services/storage';
import { Trip } from '@/types';
import './Trips.css';

export function TripForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<Trip>({
    id: '',
    name: '',
    vehicleName: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    createdAt: Date.now(),
  });

  useEffect(() => {
    if (isEdit && id) {
      const trip = storage.getTrips().find(t => t.id === id);
      if (trip) setForm(trip);
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.vehicleName) return;

    if (isEdit) {
      storage.updateTrip(form);
    } else {
      storage.addTrip({ ...form, id: storage.generateId(), createdAt: Date.now() });
    }
    navigate('/trips');
  };

  return (
    <div className="trip-form-page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/trips')}>
          <ArrowLeft size={24} />
        </button>
        <h2>{isEdit ? 'Edit Trip' : 'New Trip'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-card slide-in">
        <div className="form-group">
          <label>Trip Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., NSW Coast Adventure"
            required
          />
        </div>

        <div className="form-group">
          <label>Vehicle Name</label>
          <input
            type="text"
            value={form.vehicleName}
            onChange={e => setForm({ ...form, vehicleName: e.target.value })}
            placeholder="e.g., Big Van"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={form.startDate}
              onChange={e => setForm({ ...form, startDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={form.endDate}
              onChange={e => setForm({ ...form, endDate: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary btn-full">
          <Save size={18} /> {isEdit ? 'Save Changes' : 'Create Trip'}
        </button>
      </form>
    </div>
  );
}

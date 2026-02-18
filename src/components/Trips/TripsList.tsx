import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Car, Calendar, Trash2, Edit } from 'lucide-react';
import { storage } from '@/services/storage';
import { Trip } from '@/types';
import './Trips.css';

export function TripsList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTrips(storage.getTrips());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this trip and all its expenses?')) {
      storage.deleteTrip(id);
      setTrips(storage.getTrips());
    }
  };

  const getTripTotal = (tripId: string) => {
    return storage.getExpensesByTrip(tripId).reduce((sum, e) => sum + e.amount, 0);
  };

  return (
    <div className="trips-page">
      <div className="page-header">
        <h2>My Trips</h2>
        <button className="btn-primary" onClick={() => navigate('/trips/new')}>
          <Plus size={20} /> New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="empty-state">
          <Car size={48} strokeWidth={1.5} />
          <p>No trips yet. Create your first trip!</p>
          <button className="btn-primary" onClick={() => navigate('/trips/new')}>
            <Plus size={18} /> Create Trip
          </button>
        </div>
      ) : (
        <div className="trips-list">
          {trips.map((trip, idx) => (
            <div 
              key={trip.id} 
              className="trip-card slide-in" 
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => navigate(`/trips/${trip.id}`)}
            >
              <div className="trip-icon">
                <Car size={24} />
              </div>
              <div className="trip-info">
                <h3>{trip.name}</h3>
                <p className="trip-vehicle">{trip.vehicleName}</p>
                <p className="trip-dates">
                  <Calendar size={14} />
                  {new Date(trip.startDate).toLocaleDateString('en-AU')} - {new Date(trip.endDate).toLocaleDateString('en-AU')}
                </p>
              </div>
              <div className="trip-total">
                ${getTripTotal(trip.id).toFixed(2)}
              </div>
              <div className="trip-actions">
                <button className="btn-icon" onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/edit`); }}>
                  <Edit size={18} />
                </button>
                <button className="btn-icon danger" onClick={(e) => handleDelete(trip.id, e)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

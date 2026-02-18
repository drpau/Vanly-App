import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard/Dashboard';
import { TripsList } from './components/Trips/TripsList';
import { TripForm } from './components/Trips/TripForm';
import { TripDetail } from './components/Trips/TripDetail';
import { AddExpense } from './components/Expenses/AddExpense';
import { Settings } from './components/Settings/Settings';
import { Help } from './components/Help/Help';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  useTheme();

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trips" element={<TripsList />} />
          <Route path="/trips/new" element={<TripForm />} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/trips/:id/edit" element={<TripForm />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;

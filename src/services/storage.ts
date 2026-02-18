import { Trip, Expense, AppSettings, DEFAULT_DARK_COLORS } from '@/types';

const TRIPS_KEY = 'vanly_trips';
const EXPENSES_KEY = 'vanly_expenses';
const SETTINGS_KEY = 'vanly_settings';

export const storage = {
  // Trips
  getTrips: (): Trip[] => {
    const data = localStorage.getItem(TRIPS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTrips: (trips: Trip[]) => {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  },

  addTrip: (trip: Trip) => {
    const trips = storage.getTrips();
    trips.push(trip);
    storage.saveTrips(trips);
  },

  updateTrip: (updated: Trip) => {
    const trips = storage.getTrips().map(t => t.id === updated.id ? updated : t);
    storage.saveTrips(trips);
  },

  deleteTrip: (tripId: string) => {
    const trips = storage.getTrips().filter(t => t.id !== tripId);
    storage.saveTrips(trips);
    // Also delete associated expenses
    const expenses = storage.getExpenses().filter(e => e.tripId !== tripId);
    storage.saveExpenses(expenses);
  },

  // Expenses
  getExpenses: (): Expense[] => {
    const data = localStorage.getItem(EXPENSES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveExpenses: (expenses: Expense[]) => {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  },

  getExpensesByTrip: (tripId: string): Expense[] => {
    return storage.getExpenses().filter(e => e.tripId === tripId);
  },

  addExpense: (expense: Expense) => {
    const expenses = storage.getExpenses();
    expenses.push(expense);
    storage.saveExpenses(expenses);
  },

  updateExpense: (updated: Expense) => {
    const expenses = storage.getExpenses().map(e => e.id === updated.id ? updated : e);
    storage.saveExpenses(expenses);
  },

  deleteExpense: (expenseId: string) => {
    const expenses = storage.getExpenses().filter(e => e.id !== expenseId);
    storage.saveExpenses(expenses);
  },

  // Settings
  getSettings: (): AppSettings => {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) return JSON.parse(data);
    return {
      theme: 'dark',
      colors: DEFAULT_DARK_COLORS,
    };
  },

  saveSettings: (settings: AppSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  // Utility
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
};

export type Category = 
  | 'fuel'
  | 'campground'
  | 'groceries'
  | 'repairs'
  | 'meals'
  | 'experiences'
  | 'upgrades'
  | 'alcohol'
  | 'miscellaneous';

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'fuel', label: 'Fuel', icon: '⛽', color: '#FF8C42' },
  { id: 'campground', label: 'Campground Fees', icon: '🏕️', color: '#1A535C' },
  { id: 'groceries', label: 'Groceries', icon: '🛒', color: '#4ECDC4' },
  { id: 'repairs', label: 'Repairs & Maintenance', icon: '🔧', color: '#FF6B6B' },
  { id: 'meals', label: 'Meals', icon: '🍔', color: '#FFE66D' },
  { id: 'experiences', label: 'Experiences', icon: '🎡', color: '#95E1D3' },
  { id: 'upgrades', label: 'Upgrades', icon: '➕', color: '#A8E6CF' },
  { id: 'alcohol', label: 'Alcohol', icon: '🍺', color: '#DDA0DD' },
  { id: 'miscellaneous', label: 'Miscellaneous', icon: '📦', color: '#6c757d' },
];

export interface Expense {
  id: string;
  tripId: string;
  amount: number;
  category: Category;
  notes: string;
  date: string;
  receiptPhoto?: string; // base64 or file reference
  createdAt: number;
}

export interface Trip {
  id: string;
  name: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  createdAt: number;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface AppSettings {
  theme: 'dark' | 'light' | 'custom';
  colors: ThemeColors;
}

export const DEFAULT_DARK_COLORS: ThemeColors = {
  primary: '#FF8C42',
  secondary: '#1A535C',
  background: '#1B1B1B',
  surface: '#2D2D2D',
  text: '#F7FFF7',
  textSecondary: '#A0A0A0',
};

export const DEFAULT_LIGHT_COLORS: ThemeColors = {
  primary: '#FF8C42',
  secondary: '#1A535C',
  background: '#F7FFF7',
  surface: '#FFFFFF',
  text: '#1B1B1B',
  textSecondary: '#6c757d',
};

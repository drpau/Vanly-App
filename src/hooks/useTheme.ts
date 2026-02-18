import { useState, useEffect } from 'react';
import { AppSettings, ThemeColors, DEFAULT_DARK_COLORS, DEFAULT_LIGHT_COLORS } from '@/types';
import { storage } from '@/services/storage';

export function useTheme() {
  const [settings, setSettings] = useState<AppSettings>(storage.getSettings());

  useEffect(() => {
    storage.saveSettings(settings);
    applyTheme(settings);
  }, [settings]);

  const applyTheme = (s: AppSettings) => {
    const colors = s.theme === 'custom' ? s.colors : s.theme === 'dark' ? DEFAULT_DARK_COLORS : DEFAULT_LIGHT_COLORS;
    const root = document.documentElement;
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--text', colors.text);
    root.style.setProperty('--text-secondary', colors.textSecondary);
  };

  const setTheme = (theme: 'dark' | 'light' | 'custom') => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const setColors = (colors: ThemeColors) => {
    setSettings(prev => ({ ...prev, theme: 'custom', colors }));
  };

  const currentColors = settings.theme === 'custom' ? settings.colors : settings.theme === 'dark' ? DEFAULT_DARK_COLORS : DEFAULT_LIGHT_COLORS;

  return { settings, setTheme, setColors, currentColors };
}

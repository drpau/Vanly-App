import { useTheme } from '@/hooks/useTheme';
import { ThemeColors, DEFAULT_DARK_COLORS, DEFAULT_LIGHT_COLORS } from '@/types';
import { Moon, Sun, Palette } from 'lucide-react';
import './Settings.css';

export function Settings() {
  const { settings, setTheme, setColors, currentColors } = useTheme();

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setColors({ ...currentColors, [key]: value });
  };

  const colorOptions = [
    { key: 'primary' as const, label: 'Primary (Orange)' },
    { key: 'secondary' as const, label: 'Secondary (Teal)' },
    { key: 'background' as const, label: 'Background' },
    { key: 'surface' as const, label: 'Surface' },
    { key: 'text' as const, label: 'Text' },
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-section slide-in">
        <h3>Theme</h3>
        <div className="theme-options">
          <button
            className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <Moon size={24} />
            <span>Dark</span>
          </button>
          <button
            className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <Sun size={24} />
            <span>Light</span>
          </button>
          <button
            className={`theme-btn ${settings.theme === 'custom' ? 'active' : ''}`}
            onClick={() => setTheme('custom')}
          >
            <Palette size={24} />
            <span>Custom</span>
          </button>
        </div>
      </div>

      {settings.theme === 'custom' && (
        <div className="settings-section slide-in">
          <h3>Custom Colors</h3>
          <div className="color-pickers">
            {colorOptions.map(opt => (
              <div key={opt.key} className="color-picker-row">
                <label>{opt.label}</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={currentColors[opt.key]}
                    onChange={e => handleColorChange(opt.key, e.target.value)}
                  />
                  <span className="color-value">{currentColors[opt.key]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="settings-section slide-in">
        <h3>Data</h3>
        <p className="settings-info">
          Your data is stored locally on this device. Delete trips or individual expenses to remove data.
        </p>
      </div>

      <div className="settings-section slide-in">
        <h3>About</h3>
        <p className="settings-info">
          Vanly v1.0<br />
          Caravan Expense Tracker
        </p>
      </div>
    </div>
  );
}

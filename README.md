# Vanly - Caravan Expense Tracker

A modern, mobile-first expense tracking app for caravan and road trip travellers.

![Vanly](https://img.shields.io/badge/version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

### Core Functionality
- **Trip Management** - Create, edit, and delete trips with name, vehicle, and date range
- **Expense Tracking** - Record expenses with amount, category, date, and notes
- **9 Expense Categories**:
  - ⛽ Fuel
  - 🏕️ Campground Fees
  - 🛒 Groceries
  - 🔧 Repairs & Maintenance
  - 🍔 Meals
  - 🎡 Experiences
  - ➕ Upgrades
  - 🍺 Alcohol
  - 📦 Miscellaneous

### Dashboard
- **Summary Cards** - Total spent and top spending category
- **Pie Chart** - Spending breakdown by category
- **Line Chart** - Spending trends over time

### Receipt Photos
- Attach receipt photos to any expense
- Photos stored locally on device

### Customization
- **Themes** - Dark (default), Light, or Custom
- **Color Picker** - Customize colors in custom theme mode
- Brand colors: Orange (#FF8C42), Teal (#1A535C), Dark (#1B1B1B), Cream (#F7FFF7)

### Help & Support
- Built-in getting started guide
- Step-by-step instructions
- FAQ section

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/drpau/Vanly-App.git
cd Vanly-App

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This app is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. Push to main branch
2. GitHub Actions automatically builds and deploys
3. App available at: https://drpau.github.io/Vanly-App/

## Data Storage

All data is stored locally on your device using browser localStorage. Your data:
- Lives with you on your device
- Can only be deleted by removing trips or individual expenses
- Is not backed up to the cloud (coming soon)

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Recharts** - Charts and graphs
- **Lucide React** - Icons
- **localStorage** - Data persistence

## Mobile Support

- PWA-capable (add to home screen)
- Touch-friendly design
- Bottom navigation
- Responsive layout

## Screenshots

The app features:
- Modern dark theme by default
- Sliding page transitions
- Animated charts
- Card-based UI with rounded corners
- Customizable colors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License

---

Built with 💜 for caravan travellers

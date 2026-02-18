import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Car, Plus, PieChart, Settings, Camera } from 'lucide-react';
import './Help.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I create a trip?",
    answer: "Go to the Trips tab and tap 'New Trip'. Give it a name, your vehicle name, and date range."
  },
  {
    question: "How do I add an expense?",
    answer: "Tap the Add button in the bottom navigation, or from a trip detail page. Select the trip, enter amount, choose a category, and add notes if needed."
  },
  {
    question: "Can I attach receipt photos?",
    answer: "Yes! When adding an expense, tap 'Add Photo' to attach a receipt image. This is stored locally on your device."
  },
  {
    question: "How do I delete a trip?",
    answer: "From the Trips list, tap the trash icon on a trip. This will delete the trip and all its expenses."
  },
  {
    question: "Is my data backed up?",
    answer: "Your data is stored locally on this device. We're working on cloud backup for future versions."
  },
  {
    question: "How do I change colors?",
    answer: "Go to Settings and choose Dark, Light, or Custom theme. In Custom mode, you can pick your own colors."
  }
];

export function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const steps = [
    { icon: Car, title: "1. Create a Trip", desc: "Add your trip details including name, vehicle, and dates" },
    { icon: Plus, title: "2. Add Expenses", desc: "Record each expense with amount, category, and notes" },
    { icon: Camera, title: "3. Attach Receipts", desc: "Optional: snap a photo of receipts for your records" },
    { icon: PieChart, title: "4. View Dashboard", desc: "See spending breakdown by category and over time" },
    { icon: Settings, title: "5. Customize", desc: "Change colors and themes in Settings" },
  ];

  return (
    <div className="help-page">
      <div className="page-header">
        <h2>Help Guide</h2>
      </div>

      <div className="help-section slide-in">
        <h3>Getting Started</h3>
        <div className="steps-list">
          {steps.map((step, idx) => (
            <div key={idx} className="step-item">
              <div className="step-icon">
                <step.icon size={20} />
              </div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="help-section slide-in">
        <h3>Categories</h3>
        <div className="categories-grid">
          <span>⛽ Fuel</span>
          <span>🏕️ Campground</span>
          <span>🛒 Groceries</span>
          <span>🔧 Repairs</span>
          <span>🍔 Meals</span>
          <span>🎡 Experiences</span>
          <span>➕ Upgrades</span>
          <span>🍺 Alcohol</span>
          <span>📦 Miscellaneous</span>
        </div>
      </div>

      <div className="help-section slide-in">
        <h3>FAQ</h3>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
                <span>{faq.question}</span>
                {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openIndex === idx && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

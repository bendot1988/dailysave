
import React from 'react';
import { SavingsGoal } from '../types';
import { CURRENCIES } from '../constants';

interface Props {
  goal: SavingsGoal;
  setGoal: (goal: SavingsGoal) => void;
  onCalculate: () => void;
  isCalculating?: boolean;
}

const CalculatorForm: React.FC<Props> = ({ goal, setGoal, onCalculate, isCalculating }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onCalculate();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyPress}>
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-2">What are you saving for?</label>
        <input
          type="text"
          placeholder="e.g. Dream Holiday, New Laptop"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#764ba2] focus:outline-none transition-colors text-lg font-medium"
          value={goal.name}
          onChange={(e) => setGoal({ ...goal, name: e.target.value })}
          disabled={isCalculating}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Currency</label>
          <select
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#764ba2] focus:outline-none transition-colors text-lg bg-white"
            value={goal.currency.code}
            disabled={isCalculating}
            onChange={(e) => {
              const selected = CURRENCIES.find(c => c.code === e.target.value);
              if (selected) setGoal({ ...goal, currency: selected });
            }}
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Target amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">{goal.currency.symbol}</span>
            <input
              type="number"
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#764ba2] focus:outline-none transition-colors text-lg font-bold"
              value={goal.amount || ''}
              disabled={isCalculating}
              onChange={(e) => setGoal({ ...goal, amount: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-2">Target date</label>
        <input
          type="date"
          min={minDate}
          disabled={isCalculating}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#764ba2] focus:outline-none transition-colors text-lg"
          value={goal.targetDate}
          onChange={(e) => setGoal({ ...goal, targetDate: e.target.value })}
        />
      </div>

      <button
        onClick={onCalculate}
        disabled={!goal.name || goal.amount <= 0 || !goal.targetDate || isCalculating}
        className="w-full bg-gradient-to-r from-[#764ba2] to-[#f5576c] text-white font-bold py-4 rounded-xl text-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4"
      >
        {isCalculating ? 'Planning...' : 'Calculate My Daily Saving'}
      </button>
    </div>
  );
};

export default CalculatorForm;

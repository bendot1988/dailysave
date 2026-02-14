
import React from 'react';
import { SavingsGoal, CalculationResult } from '../types';

interface Props {
  goal: SavingsGoal;
  result: CalculationResult;
  isAiLoading?: boolean;
}

const ResultsDisplay: React.FC<Props> = ({ goal, result, isAiLoading }) => {
  const format = (num: number) => {
    return new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <h3 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-1">Your Personalised Goal</h3>
        <h2 className="text-4xl font-extrabold text-[#14233c]">{goal.name}</h2>
        <p className="text-gray-500 mt-2 font-medium">
          Only <span className="text-[#764ba2] font-bold">{result.daysRemaining} days</span> to go!
        </p>
      </div>

      <div className="bg-gray-50 rounded-3xl p-8 mb-6 border border-gray-100 shadow-inner">
        <p className="text-gray-600 font-semibold mb-2">Daily amount needed</p>
        <div className="text-[#14233c] font-black leading-tight flex items-center justify-center gap-1">
          <span className="text-3xl align-top pt-2">{goal.currency.symbol}</span>
          <span className="text-6xl md:text-8xl">{format(result.dailyAmount)}</span>
        </div>
        <p className="text-sm text-gray-400 mt-4 italic">Less than the cost of a fancy lunch!</p>
      </div>

      {(isAiLoading || result.aiTip) && (
        <div className={`mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 p-4 rounded-2xl flex items-center gap-3 text-left transition-all duration-500 ${isAiLoading ? 'animate-pulse' : ''}`}>
          <div className="bg-white p-2 rounded-full shadow-sm text-xl flex-shrink-0">
            {isAiLoading ? '⏳' : '✨'}
          </div>
          <div className="flex-1">
            {isAiLoading ? (
              <p className="text-gray-400 font-medium text-sm italic">DaySaver is thinking of a motivating tip for you...</p>
            ) : (
              <p className="text-[#764ba2] font-semibold text-sm italic leading-snug">
                DaySaver Tip: "{result.aiTip}"
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center group hover:border-[#764ba2] transition-colors">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Weekly Saving</span>
          <span className="text-2xl font-bold text-[#14233c]">
            {goal.currency.symbol}{format(result.weeklyAmount)}
          </span>
        </div>
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center group hover:border-[#f5576c] transition-colors">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Monthly Saving</span>
          <span className="text-2xl font-bold text-[#14233c]">
            {goal.currency.symbol}{format(result.monthlyAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;

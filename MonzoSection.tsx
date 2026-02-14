
import React from 'react';
import { MONZO_GRADIENT } from '../constants';
import { Currency } from '../types';

interface Props {
  goalName: string;
  dailyAmount: number;
  currency: Currency;
}

const MonzoSection: React.FC<Props> = ({ goalName, dailyAmount, currency }) => {
  const formattedAmount = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(dailyAmount);

  return (
    <section className={`${MONZO_GRADIENT} rounded-3xl p-8 text-white shadow-xl relative overflow-hidden`}>
      <div className="absolute top-[-20px] right-[-20px] text-8xl opacity-10 rotate-12">🏦</div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🏦</span>
          <h3 className="text-xl font-bold">Automate with Monzo Pots</h3>
        </div>

        <p className="text-white/90 leading-relaxed mb-6">
          The easiest way to reach your <span className="font-bold text-white underline decoration-[#f5576c] decoration-2 underline-offset-4">{goalName}</span> goal is to automate it! 
          You can set up a Monzo Pot to automatically set aside <span className="font-bold">{currency.symbol}{formattedAmount}</span> every single day.
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-2">
            <span className="text-xs">💡</span> Pro Tip
          </h4>
          <p className="text-sm">
            Set up a scheduled transfer in the Monzo app for 1am every morning. You'll wake up every day knowing you're one step closer to your {goalName}!
          </p>
        </div>
      </div>
    </section>
  );
};

export default MonzoSection;

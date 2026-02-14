import React, { useState, useRef, useEffect } from 'react';
import { SavingsGoal, CalculationResult } from './types';
import { CURRENCIES, APP_GRADIENT } from './constants';
import Header from './Header';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';
import MonzoSection from './MonzoSection';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [goal, setGoal] = useState<SavingsGoal>({
    name: '',
    amount: 0,
    currency: CURRENCIES[0],
    targetDate: ''
  });
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const fetchAiTip = async (goalName: string, dailyAmount: string) => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Give me one short, creative, and motivating 10-word saving tip for someone saving for "${goalName}". Mention the daily saving of ${dailyAmount}. Make it sound exciting and British English. No hashtags.`,
      });
      
      const tip = response.text?.trim() || "Every penny counts towards your dream!";
      
      setResult(prev => prev ? { ...prev, aiTip: tip } : null);
    } catch (error) {
      console.error("Failed to fetch AI tip:", error);
      setResult(prev => prev ? { ...prev, aiTip: "Consistency is the key to reaching your big dreams!" } : null);
    } finally {
      setIsAiLoading(false);
    }
  };

  const calculateResults = async () => {
    if (!goal.name || goal.amount <= 0 || !goal.targetDate) return;

    setIsCalculating(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(goal.targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      setIsCalculating(false);
      alert("Target date must be at least tomorrow!");
      return;
    }

    const daily = goal.amount / diffDays;
    const weekly = daily * 7;
    const monthly = (goal.amount / diffDays) * 30.44;

    const formattedDaily = `${goal.currency.symbol}${daily.toFixed(2)}`;

    setResult({
      daysRemaining: diffDays,
      dailyAmount: daily,
      weeklyAmount: weekly,
      monthlyAmount: monthly,
      aiTip: undefined 
    });

    setIsCalculating(false);
    fetchAiTip(goal.name, formattedDaily);
  };

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result?.daysRemaining]);

  return (
    <div className={`min-h-screen ${APP_GRADIENT} py-8 px-4 flex flex-col items-center`}>
      <div className="w-full max-w-2xl animate-fade-in">
        <Header />
        
        <main className="bg-white rounded-[30px] p-6 md:p-10 shadow-2xl mt-8 transition-all duration-500">
          <h2 className="text-2xl font-bold text-[#14233c] mb-6">Start your journey</h2>
          
          <CalculatorForm 
            goal={goal} 
            setGoal={setGoal} 
            onCalculate={calculateResults}
            isCalculating={isCalculating}
          />

          {result && (
            <div ref={resultsRef} className="mt-12 pt-8 border-t border-gray-100 animate-slide-up">
              <ResultsDisplay goal={goal} result={result} isAiLoading={isAiLoading} />
              <div className="mt-12">
                <MonzoSection goalName={goal.name} dailyAmount={result.dailyAmount} currency={goal.currency} />
              </div>
            </div>
          )}
        </main>

        <footer className="mt-8 text-center text-white/70 text-sm">
          <p>© {new Date().getFullYear()} DaySaver. Making big goals feel small.</p>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default App;

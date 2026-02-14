
export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface SavingsGoal {
  name: string;
  amount: number;
  currency: Currency;
  targetDate: string;
}

export interface CalculationResult {
  daysRemaining: number;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
  aiTip?: string;
}

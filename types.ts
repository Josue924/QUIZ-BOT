
export interface QuizQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export type Quiz = QuizQuestion[];

export type UserAnswers = { [key: number]: 'A' | 'B' | 'C' | 'D' | null };

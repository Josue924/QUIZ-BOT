
import React from 'react';
import type { Quiz, UserAnswers } from '../types';
import QuestionCard from './QuestionCard';

interface QuizDisplayProps {
  quiz: Quiz;
  userAnswers: UserAnswers;
  onAnswerSelect: (questionIndex: number, answer: 'A' | 'B' | 'C' | 'D') => void;
  onSubmit: () => void;
  submitted: boolean;
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ quiz, userAnswers, onAnswerSelect, onSubmit, submitted }) => {
  return (
    <div className="space-y-8">
      {quiz.map((questionData, index) => (
        <QuestionCard
          key={index}
          questionIndex={index}
          questionData={questionData}
          userAnswer={userAnswers[index]}
          onAnswerSelect={onAnswerSelect}
          submitted={submitted}
        />
      ))}
      {!submitted && quiz.length > 0 && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onSubmit}
            className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 disabled:bg-slate-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;

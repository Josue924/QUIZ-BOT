
import React from 'react';
import type { QuizQuestion } from '../types';
import { CheckIcon, XIcon } from './icons';

interface QuestionCardProps {
  questionData: QuizQuestion;
  questionIndex: number;
  userAnswer: 'A' | 'B' | 'C' | 'D' | null;
  onAnswerSelect: (questionIndex: number, answer: 'A' | 'B' | 'C' | 'D') => void;
  submitted: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionData, questionIndex, userAnswer, onAnswerSelect, submitted }) => {
  const { question, options, correctAnswer, explanation } = questionData;

  const getOptionStyle = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (!submitted) {
      return userAnswer === optionKey 
        ? 'bg-sky-600 border-sky-500 ring-2 ring-sky-400' 
        : 'bg-slate-700 border-slate-600 hover:bg-slate-600';
    }

    const isCorrect = optionKey === correctAnswer;
    const isSelected = optionKey === userAnswer;

    if (isCorrect) return 'bg-green-700/50 border-green-500';
    if (isSelected && !isCorrect) return 'bg-red-700/50 border-red-500';
    return 'bg-slate-700 border-slate-600 opacity-60';
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-sky-300 mb-1">Question {questionIndex + 1}</h3>
      <p className="text-xl font-medium text-slate-100 mb-6">{question}</p>
      
      <div className="space-y-4">
        {Object.entries(options).map(([key, value]) => {
          const optionKey = key as 'A' | 'B' | 'C' | 'D';
          return (
            <button
              key={optionKey}
              onClick={() => onAnswerSelect(questionIndex, optionKey)}
              disabled={submitted}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex justify-between items-center ${getOptionStyle(optionKey)}`}
            >
              <span className="font-medium">{`${optionKey}) ${value}`}</span>
              {submitted && (
                <>
                  {optionKey === correctAnswer && <CheckIcon className="w-6 h-6 text-green-400" />}
                  {userAnswer === optionKey && optionKey !== correctAnswer && <XIcon className="w-6 h-6 text-red-400" />}
                </>
              )}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
          <p className="font-bold text-slate-200">
            <span className={userAnswer === correctAnswer ? 'text-green-400' : 'text-red-400'}>
              {userAnswer === correctAnswer ? 'Correct!' : 'Incorrect.'}
            </span>
            <span className="text-slate-300"> The correct answer is {correctAnswer}.</span>
          </p>
          <p className="mt-2 text-slate-300">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;


import React from 'react';

interface ScoreSummaryProps {
  score: number;
  totalQuestions: number;
  onReset: () => void;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({ score, totalQuestions, onReset }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "";
  if (percentage === 100) {
    message = "Perfect Score! You're a genius!";
  } else if (percentage >= 80) {
    message = "Great job! You really know your stuff.";
  } else if (percentage >= 50) {
    message = "Good effort! Keep learning and try again.";
  } else {
    message = "Keep practicing! Knowledge is a journey.";
  }

  return (
    <div className="text-center bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
      <h2 className="text-3xl font-bold text-sky-400 mb-4">Quiz Complete!</h2>
      <p className="text-xl text-slate-300 mb-2">You scored:</p>
      <p className="text-6xl font-extrabold text-white mb-4">
        {score} / {totalQuestions}
      </p>
      <div className="w-full bg-slate-700 rounded-full h-4 mb-4">
        <div 
          className="bg-sky-500 h-4 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-lg text-slate-300 italic mb-8">{message}</p>
      <button
        onClick={onReset}
        className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50"
      >
        Create Another Quiz
      </button>
    </div>
  );
};

export default ScoreSummary;

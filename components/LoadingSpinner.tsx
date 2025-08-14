
import React from 'react';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-400"></div>
    <p className="text-sky-300 text-lg font-medium">QuizBot is thinking...</p>
  </div>
);

export default LoadingSpinner;

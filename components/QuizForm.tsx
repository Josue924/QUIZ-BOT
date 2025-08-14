
import React from 'react';
import { SparklesIcon } from './icons';

interface QuizFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  numQuestions: number;
  setNumQuestions: (num: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({ topic, setTopic, numQuestions, setNumQuestions, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
          What topic do you want a quiz on?
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'Ancient Rome' or 'JavaScript Fundamentals'"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-200"
          required
        />
      </div>
      <div>
        <label htmlFor="numQuestions" className="block text-sm font-medium text-slate-300 mb-2">
          How many questions?
        </label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 1)))}
          min="1"
          max="10"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-200"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading || !topic.trim()}
        className="w-full flex items-center justify-center px-6 py-4 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50"
      >
        {loading ? (
            'Generating...'
        ) : (
            <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Generate Quiz
            </>
        )}
      </button>
    </form>
  );
};

export default QuizForm;

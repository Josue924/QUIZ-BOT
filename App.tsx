
import React, { useState, useCallback } from 'react';
import type { Quiz, UserAnswers } from './types';
import { generateQuiz } from './services/geminiService';
import QuizForm from './components/QuizForm';
import QuizDisplay from './components/QuizDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ScoreSummary from './components/ScoreSummary';
import { RobotIcon } from './components/icons';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('World Capitals');
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleGenerateQuiz = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    setError(null);
    setQuiz(null);
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);

    try {
      const quizData = await generateQuiz(topic, numQuestions);
      if (quizData && quizData.length > 0) {
        setQuiz(quizData);
        // Initialize answers state
        const initialAnswers: UserAnswers = {};
        quizData.forEach((_, index) => {
            initialAnswers[index] = null;
        });
        setUserAnswers(initialAnswers);

      } else {
        setError("The generated quiz was empty. Please try a different topic.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [topic, numQuestions]);

  const handleAnswerSelect = (questionIndex: number, answer: 'A' | 'B' | 'C' | 'D') => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    let currentScore = 0;
    quiz.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };
  
  const handleReset = () => {
    setQuiz(null);
    setSubmitted(false);
    setUserAnswers({});
    setScore(0);
    setError(null);
    // Optional: clear topic
    // setTopic(''); 
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <RobotIcon className="w-12 h-12 text-sky-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Quiz<span className="text-sky-400">Bot</span>
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Your friendly AI assistant for creating fun and educational quizzes.
          </p>
        </header>

        {!quiz && (
          <div className="max-w-md mx-auto">
            <QuizForm 
              topic={topic}
              setTopic={setTopic}
              numQuestions={numQuestions}
              setNumQuestions={setNumQuestions}
              onSubmit={handleGenerateQuiz}
              loading={loading}
            />
          </div>
        )}

        {loading && <div className="mt-12"><LoadingSpinner /></div>}
        
        {error && (
            <div className="mt-12 max-w-md mx-auto bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">Oops! Something went wrong.</h3>
                <p>{error}</p>
            </div>
        )}

        {quiz && !loading && (
           <div className="mt-12">
             {submitted && (
                <div className="mb-8">
                    <ScoreSummary score={score} totalQuestions={quiz.length} onReset={handleReset} />
                </div>
             )}
            <QuizDisplay 
              quiz={quiz}
              userAnswers={userAnswers}
              onAnswerSelect={handleAnswerSelect}
              onSubmit={handleSubmitQuiz}
              submitted={submitted}
            />
           </div>
        )}
        
      </main>
      <footer className="text-center mt-16 text-slate-500 text-sm">
        <p>Powered by Google Gemini API. Created with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;

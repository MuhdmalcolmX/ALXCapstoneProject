// src/App.tsx
import React, { useState, useEffect } from 'react';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions } from './services/api';

interface QuizSettings {
  category: string;
  numQuestions: number;
  difficulty: string;
}

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function App() {
  const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (quizSettings) {
      const loadQuestions = async () => {
        const questions = await fetchQuestions(
          quizSettings.category,
          quizSettings.numQuestions,
          quizSettings.difficulty
        );
        setQuestions(questions);
      };
      loadQuestions();
    }
  }, [quizSettings]);

  const handleStartQuiz = (category: string, numQuestions: number, difficulty: string) => {
    setQuizSettings({ category, numQuestions, difficulty });
  };

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!quizSettings ? (
        <QuizStart onStartQuiz={handleStartQuiz} />
      ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
        <QuestionCard
          question={questions[currentQuestionIndex].question}
          options={[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].sort()}
          onAnswer={handleAnswer}
        />
      ) : (
        <p className="text-center mt-10">Quiz completed! Your score is {score}/{questions.length}.</p>
      )}
    </div>
  );
}

export default App;

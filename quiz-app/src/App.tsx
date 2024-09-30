import React, { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";

// TypeScript interfaces for quiz data
interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function App() {
  const [quizSettings, setQuizSettings] = useState<{ category: string; difficulty: string } | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Fetch quiz questions based on selected category and difficulty
  useEffect(() => {
    if (quizSettings) {
      const { category, difficulty } = quizSettings;
      fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      )
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data.results);
        })
        .catch((err) => console.error("Error fetching quiz data:", err));
    }
  }, [quizSettings]);

  const handleStartQuiz = (category: string, difficulty: string) => {
    setQuizSettings({ category, difficulty });
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
        <p className="text-center mt-10">
          Quiz completed! Your score is {score}/{questions.length}.
        </p>
      )}
    </div>
  );
}

export default App;

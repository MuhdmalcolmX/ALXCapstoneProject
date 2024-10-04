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
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Track selected answer
  const [isAnswered, setIsAnswered] = useState(false); // Track whether the current question is answered

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

  // Handle quiz start
  const handleStartQuiz = (category: string, difficulty: string) => {
    setQuizSettings({ category, difficulty });
    setCurrentQuestionIndex(0); // Reset to first question when restarting the quiz
    setScore(0); // Reset score when restarting the quiz
  };

  // Handle answer selection
  const handleAnswer = (selectedAnswer: string) => {
    setSelectedAnswer(selectedAnswer);
    setIsAnswered(true);

    // Check if the selected answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null); // Reset the selected answer for the next question
    setIsAnswered(false); // Reset the answered state for the next question
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {!quizSettings ? (
        <QuizStart onStartQuiz={handleStartQuiz} />
      ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div>
          <QuestionCard
            question={questions[currentQuestionIndex].question}
            options={[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].sort(() => Math.random() - 0.5)} // Shuffle the options
            correctAnswer={questions[currentQuestionIndex].correct_answer}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer} // Pass the selected answer to QuestionCard
            isAnswered={isAnswered} // Pass the answered state to QuestionCard
          />
          {isAnswered && (
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      ) : (
        <p className="text-center mt-10 text-black">
          Quiz completed! Your score is {score}/{questions.length}.
        </p>
      )}
    </div>
  );
}

export default App;

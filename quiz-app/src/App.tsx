import React, { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import QuizHistory from "./components/QuizHistory";

// TypeScript interfaces for quiz data and history
interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizHistoryItem {
  category: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  date: string;
}

function App() {
  const [quizSettings, setQuizSettings] = useState<{ category: string; difficulty: string } | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false); // New state to control when quiz is finished
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);

  // Load quiz history from local storage when the app loads
  useEffect(() => {
    const storedHistory = localStorage.getItem("quizHistory");
    if (storedHistory) {
      setQuizHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Fetch quiz questions based on selected category and difficulty
  useEffect(() => {
    if (quizSettings) {
      const { category, difficulty } = quizSettings;
      fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
        .then((res) => res.json())
        .then((data) => setQuestions(data.results))
        .catch((err) => console.error("Error fetching quiz data:", err));
    }
  }, [quizSettings]);

  const handleStartQuiz = (category: string, difficulty: string) => {
    setQuizSettings({ category, difficulty });
    setCurrentQuestionIndex(0); // Start quiz from the first question
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizFinished(false); // Reset quiz finished state
  };

  const handleAnswer = (selectedAnswer: string) => {
    setSelectedAnswer(selectedAnswer);
    setIsAnswered(true);
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    // If all questions are answered, trigger the end of the quiz
    if (currentQuestionIndex + 1 >= questions.length) {
      setIsQuizFinished(true); // Mark quiz as finished
      saveQuizResult();
      return;
    }

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  // Save quiz result in local storage and show the final scorecard
  const saveQuizResult = () => {
    const newHistoryItem: QuizHistoryItem = {
      category: quizSettings!.category,
      difficulty: quizSettings!.difficulty,
      score,
      totalQuestions: questions.length,
      date: new Date().toLocaleString(),
    };

    const updatedHistory = [...quizHistory, newHistoryItem];
    setQuizHistory(updatedHistory);
    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-indigo-400 flex flex-col items-center justify-center">
      {!quizSettings && !isQuizFinished ? (
        <>
          <QuizStart onStartQuiz={handleStartQuiz} />
          {quizHistory.length > 0 && <QuizHistory history={quizHistory} />}
        </>
      ) : isQuizFinished ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Quiz Completed!</h2>
          <p className="text-lg text-gray-600">
            Your score is <span className="font-bold text-indigo-600">{score}</span>/{questions.length}.
          </p>
          <button
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        questions.length > 0 && currentQuestionIndex < questions.length && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12">
            <QuestionCard
              question={questions[currentQuestionIndex].question}
              options={[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].sort(
                () => Math.random() - 0.5
              )}
              correctAnswer={questions[currentQuestionIndex].correct_answer}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
            />
            {isAnswered && (
              <button
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg w-full hover:bg-indigo-700 transition-colors"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default App;

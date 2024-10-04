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
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false); // State for toggling quiz history popup
  const [timer, setTimer] = useState<number>(10); // Countdown timer starting at 10 seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false); // To track if timer is active

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
        .then((data) => {
          setQuestions(data.results);
          setIsTimerActive(true); // Activate timer when questions are loaded
          setTimer(10); // Reset timer for the new set of questions
        })
        .catch((err) => console.error("Error fetching quiz data:", err));
    }
  }, [quizSettings]);

  // Effect to handle timer countdown
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isTimerActive && timer > 0) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion(); // Automatically move to the next question if time runs out
    }

    return () => {
      clearInterval(timerId); // Cleanup the interval on unmount
    };
  }, [isTimerActive, timer]);

  const handleStartQuiz = (category: string, difficulty: string) => {
    setQuizSettings({ category, difficulty });
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizFinished(false);
    setTimer(10); // Reset timer for the new quiz
    setIsTimerActive(true); // Activate timer
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
    if (currentQuestionIndex + 1 >= questions.length) {
      setIsQuizFinished(true);
      saveQuizResult();
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimer(10); // Reset timer for the next question
  };

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

  // Handle clearing the quiz history
  const handleClearHistory = () => {
    localStorage.removeItem("quizHistory");
    setQuizHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-indigo-400 flex flex-col items-center justify-center">
      {!quizSettings && !isQuizFinished ? (
        <>
          <QuizStart onStartQuiz={handleStartQuiz} />
          {/* Button to toggle history popup */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            {showHistory ? "Hide History" : "Show History"}
          </button>
          {/* History Popup */}
          {showHistory && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 max-h-full overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setShowHistory(false)}
                  className="absolute top-2 right-2 bg-gray-500 text-white py-1 px-2 rounded-full hover:bg-gray-600"
                >
                  X
                </button>
                <QuizHistory history={quizHistory} />
                {/* Clear History Button */}
                <button
                  onClick={handleClearHistory}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
                >
                  Clear History
                </button>
              </div>
            </div>
          )}
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <QuestionCard
              question={questions[currentQuestionIndex].question}
              options={[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].sort()}
              correctAnswer={questions[currentQuestionIndex].correct_answer}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
              onNextQuestion={handleNextQuestion}
            />
            <div className="text-center mt-4">
              <p className="text-lg font-normal text-red-600">Time remaining: {timer} seconds</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;

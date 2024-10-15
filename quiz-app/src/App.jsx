import React, { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import QuizHistory from "./components/QuizHistory";
import Home from "./components/Home"; // Import the Home component

function App() {
  const [quizSettings, setQuizSettings] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // State for toggling quiz history popup
  const [timer, setTimer] = useState(10); // Timer for each question
  const [hasStarted, setHasStarted] = useState(false); // Track whether the quiz has started

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
          console.log(data); // Log the data to check what is returned
          setQuestions(data.results);
        })
        .catch((err) => console.error("Error fetching quiz data:", err));
    }
  }, [quizSettings]);

  // Start the timer only after the quiz starts and when questions are loaded
  useEffect(() => {
    if (hasStarted && questions.length > 0 && !isQuizFinished) {
      if (timer > 0) {
        const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(timerId);
      } else if (timer === 0) {
        handleNextQuestion(); // Automatically go to the next question when time is up
      }
    }
  }, [timer, hasStarted, questions.length, isQuizFinished]);

  const handleStartQuiz = (category, difficulty) => {
    setQuizSettings({ category, difficulty });
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizFinished(false);
    setTimer(10); // Reset timer for each new quiz
  };

  const handleAnswer = (selectedAnswer) => {
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
    const newHistoryItem = {
      category: quizSettings.category,
      difficulty: quizSettings.difficulty,
      score,
      totalQuestions: questions.length,
      date: new Date().toLocaleString(),
    };

    const updatedHistory = [...quizHistory, newHistoryItem];
    setQuizHistory(updatedHistory);
    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
  };

  // Calculate average score and best score
  const calculateAverageScore = () => {
    if (quizHistory.length === 0) return 0;
    const totalScore = quizHistory.reduce((sum, item) => sum + item.score, 0);
    return totalScore / quizHistory.length;
  };

  const getBestScore = () => {
    if (quizHistory.length === 0) return 0;
    return Math.max(...quizHistory.map(item => item.score));
  };

  // Handle clearing the quiz history
  const handleClearHistory = () => {
    localStorage.removeItem("quizHistory");
    setQuizHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-indigo-400 flex flex-col items-center justify-center">
      {!hasStarted ? (
        <Home onStart={() => setHasStarted(true)} /> // Render the Home component if the quiz hasn't started
      ) : !quizSettings && !isQuizFinished ? (
        <>
          <QuizStart
            onStartQuiz={handleStartQuiz}
            quizHistory={quizHistory} // Pass quiz history from state
            onClearHistory={handleClearHistory} // Pass clear history function
          />
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
          <p className="text-lg text-gray-600">
            Average Score: <span className="font-bold text-indigo-600">{calculateAverageScore()}</span>
          </p>
          <p className="text-lg text-gray-600">
            Best Score: <span className="font-bold text-indigo-600">{getBestScore()}</span>
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
            <div className="text-center mb-4">
              <p className="text-lg font-medium text-red-600">Time Remaining: {timer} seconds</p>
            </div>
            <QuestionCard
              question={questions[currentQuestionIndex].question}
              options={[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].sort()}
              correctAnswer={questions[currentQuestionIndex].correct_answer}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
              onNextQuestion={handleNextQuestion}
            />
          </div>
        )
      )}
    </div>
  );
}

export default App;

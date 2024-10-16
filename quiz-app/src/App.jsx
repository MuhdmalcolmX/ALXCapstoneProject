// App.js

import React, { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import QuizHistory from "./components/QuizHistory";
import Home from "./components/Home"; // Import the Home component

function App() {
  const [quizSettings, setQuizSettings] = useState(null); // Holds quiz settings
  const [questions, setQuestions] = useState([]); // Holds fetched questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [score, setScore] = useState(0); // User's score
  const [selectedAnswer, setSelectedAnswer] = useState(null); // User's selected answer
  const [isAnswered, setIsAnswered] = useState(false); // Whether the current question is answered
  const [isQuizFinished, setIsQuizFinished] = useState(false); // Whether the quiz is finished
  const [quizHistory, setQuizHistory] = useState([]); // Holds quiz history
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
      fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      )
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

  // Function to start the quiz with chosen settings
  const handleStartQuiz = (category, difficulty) => {
    setQuizSettings({ category, difficulty });
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizFinished(false);
    setTimer(10); // Reset timer for each new quiz
  };

  // Handle user's answer selection
  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
    setIsAnswered(true);
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Handle next question or finish the quiz
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

  // Save the quiz result to local storage and state
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

  // Calculate average score based on quiz history
  const calculateAverageScore = () => {
    if (quizHistory.length === 0) return 0;
    const totalScore = quizHistory.reduce((sum, item) => sum + item.score, 0);
    return totalScore / quizHistory.length;
  };

  // Get the best score from quiz history
  const getBestScore = () => {
    if (quizHistory.length === 0) return 0;
    return Math.max(...quizHistory.map((item) => item.score));
  };

  // Handle clearing the quiz history
  const handleClearHistory = () => {
    localStorage.removeItem("quizHistory");
    setQuizHistory([]);
  };

    // Object that maps category IDs to category names
    const categoryMapping = {
      "9": "General Knowledge",
      "21": "Sports",
      "23": "History",
      "27": "Animals",
      "17": "Science & Nature",
      "22": "Geography",
      "18": "Science: Computers",
      "28": "Vehicles",
      "10": "Books",
      "24": "Politics",
      "11": "Film",
      "12": "Music",
      "26": "Celebrities",
      "14": "Television",
      "15": "Video Games",
      "31": "Japanese Anime & Manga",
      "32": "Cartoon & Animations",
      // Additional categories can be added here as needed
    };

  // Sharing the score on Twitter
  const handleShareTwitter = () => {
    const categoryName = categoryMapping[quizSettings.category] ; // Get the category name
    const shareText = `I just scored ${score}/${questions.length} in the ${categoryName} category on the Quiz App! Can you beat my score?`;
    const shareUrl = "https://alx-capstone-project-ea26dvafa-mohammed-syllas-projects.vercel.app"; // Quiz App URL on Vercel
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

    window.open(twitterShareUrl, "_blank");
  };
  
  // Sharing the score on WhatsApp
  const handleShareWhatsApp = () => {
    const categoryName = categoryMapping[quizSettings.category] ; // Get the category name
    const shareText = `I scored ${score}/${questions.length} in the ${categoryName} category on the Quiz App! Can you beat it?`;
    const shareUrl = "https://alx-capstone-project-ea26dvafa-mohammed-syllas-projects.vercel.app"; // Quiz App URL on Vercel
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`;

    window.open(whatsappShareUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-teal-6000 flex flex-col items-center justify-center">
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
            className="mt-6 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retake Quiz
          </button>

          {/* Share Buttons */}
          <div className="mt-10">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-blue-600"
              onClick={handleShareTwitter}
            >
              Share on Twitter
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              onClick={handleShareWhatsApp}
            >
              Share on WhatsApp
            </button>
          </div>


        </div>
      ) : (
        questions.length > 0 && currentQuestionIndex < questions.length && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-center mb-4">
              <p className="text-lg font-medium text-red-600">Time Remaining: {timer} seconds</p>
            </div>
            <QuestionCard
              question={questions[currentQuestionIndex].question}
              options={[
                ...questions[currentQuestionIndex].incorrect_answers,
                questions[currentQuestionIndex].correct_answer,
              ].sort()}
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

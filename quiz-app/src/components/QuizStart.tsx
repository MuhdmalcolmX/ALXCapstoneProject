import React, { useState } from "react";
import QuizHistory from "./QuizHistory"; // Import the QuizHistory component

interface QuizStartProps {
  onStartQuiz: (category: string, difficulty: string) => void;
  quizHistory: Array<{
    category: string;
    difficulty: string;
    score: number;
    totalQuestions: number;
    date: string;
  }>;
  onClearHistory: () => void;
}

const QuizStart: React.FC<QuizStartProps> = ({ onStartQuiz, quizHistory, onClearHistory }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [showHistory, setShowHistory] = useState(false); // State for toggling quiz history popup

  const handleStart = () => {
    if (category && difficulty) {
      onStartQuiz(category, difficulty);
    } else {
      alert("Please select both category and difficulty!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Start Quiz</h1>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-lg mb-2 text-black">Select Category</label>
          <select
            className="border border-gray-300 p-3 w-full rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a Category</option>
            <option value="9">General Knowledge</option>
            <option value="21">Sports</option>
            <option value="23">History</option>
            <option value="27">Animals</option>
            <option value="17">Science & Nature</option>
          </select>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-4">
          <label className="block text-lg mb-2 text-black">Select Difficulty</label>
          <select
            className="border border-gray-300 p-3 w-full rounded-lg"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Choose Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300"
          onClick={handleStart}
        >
          Start Quiz
        </button>

        {/* Show History Button */}
        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md text-sm hover:bg-green-600 w-full"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
      </div>

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
              onClick={onClearHistory}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
            >
              Clear History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizStart;

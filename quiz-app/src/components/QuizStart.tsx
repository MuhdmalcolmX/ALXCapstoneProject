import React, { useState } from "react";

interface QuizStartProps {
  onStartQuiz: (category: string, difficulty: string) => void;
}

const QuizStart: React.FC<QuizStartProps> = ({ onStartQuiz }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleStart = () => {
    if (category && difficulty) {
      onStartQuiz(category, difficulty);
    } else {
      alert("Please select both category and difficulty!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
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

      </div>
    </div>
  );
};

export default QuizStart;

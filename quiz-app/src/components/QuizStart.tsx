import React, { useState } from "react";

interface QuizStartProps {
  onStartQuiz: (category: string, difficulty: string) => void;
}

const QuizStart: React.FC<QuizStartProps> = ({ onStartQuiz }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleStart = () => {
    onStartQuiz(category, difficulty);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-8">Start Quiz</h1>
      
      {/* Category Selection */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Select Category</label>
        <select
          className="border border-gray-300 p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose a Category</option>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="27">Animals</option>
          <option value="17">Science & Nature</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Difficulty Selection */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Select Difficulty</label>
        <select
          className="border border-gray-300 p-2"
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
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleStart}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;

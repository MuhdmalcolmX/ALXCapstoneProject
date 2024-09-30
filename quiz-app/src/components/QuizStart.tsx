// src/components/QuizStart.tsx
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';

interface Category {
  id: number;
  name: string;
}

interface QuizStartProps {
  onStartQuiz: (category: string, numQuestions: number, difficulty: string) => void;
}

const QuizStart: React.FC<QuizStartProps> = ({ onStartQuiz }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };
    loadCategories();
  }, []);

  const startQuiz = () => {
    if (selectedCategory) {
      onStartQuiz(selectedCategory, numQuestions, difficulty);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Start Quiz</h2>
      
      <label className="block mb-2">
        Category:
        <select
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Number of Questions:
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={numQuestions}
          min="5"
          max="20"
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
        />
      </label>

      <label className="block mb-4">
        Difficulty:
        <select
          className="w-full p-2 border rounded"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button
        onClick={startQuiz}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;

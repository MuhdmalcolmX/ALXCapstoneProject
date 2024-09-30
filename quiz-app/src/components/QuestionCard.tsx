// src/components/QuestionCard.tsx
import React, { useState } from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (selected: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">{question}</h2>
      <div className="flex flex-col">
        {options.map((option, index) => (
          <label key={index} className="mb-2">
            <input
              type="radio"
              name="answer"
              value={option}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />{' '}
            {option}
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuestionCard;

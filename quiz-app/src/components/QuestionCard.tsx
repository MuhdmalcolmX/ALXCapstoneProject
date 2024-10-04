import React from "react";

interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (selectedAnswer: string) => void;
  selectedAnswer: string | null; // New prop for the selected answer
  isAnswered: boolean; // New prop for tracking if the question is answered
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  selectedAnswer,
  isAnswered
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-colors ${
              isAnswered && option === correctAnswer
                ? "bg-green-500 text-white"
                : isAnswered && option === selectedAnswer
                ? "bg-red-500 text-white"
                : ""
            }`}
            onClick={() => !isAnswered && onAnswer(option)} // Only allow answer selection if not already answered
            disabled={isAnswered} // Disable buttons once the answer is selected
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;

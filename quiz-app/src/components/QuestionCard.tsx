import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, correctAnswer, selectedAnswer, isAnswered, onAnswer }) => {
  const handleAnswerClick = (answer: string) => {
    if (!isAnswered) {
      onAnswer(answer);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-black" dangerouslySetInnerHTML={{ __html: question }} />

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered} // Disable buttons after answering
            className={`w-full py-2 px-4 rounded-lg text-left
              ${isAnswered && option === correctAnswer ? 'bg-green-500 text-white' : ''} 
              ${isAnswered && option === selectedAnswer && option !== correctAnswer ? 'bg-red-500 text-white' : ''}
              ${!isAnswered ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-300 cursor-not-allowed'}`}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>

      {isAnswered && (
        <div className="mt-4 text-center">
          {selectedAnswer === correctAnswer ? (
            <p className="text-green-600 font-semibold">Correct! 🎉</p>
          ) : (
            <p className="text-red-600 font-semibold">Incorrect! The correct answer is {correctAnswer}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;

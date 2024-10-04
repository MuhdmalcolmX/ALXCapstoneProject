import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onAnswer: (answer: string) => void;
  onNextQuestion: () => void; // Add the onNextQuestion function as a prop
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  onAnswer,
  onNextQuestion, // Destructure the onNextQuestion prop
}) => {
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
            <p className="text-red-600 font-semibold">
              Incorrect! The correct answer is {correctAnswer}.
            </p>
          )}

          {/* Next Question Button */}
          <button
            onClick={onNextQuestion}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;

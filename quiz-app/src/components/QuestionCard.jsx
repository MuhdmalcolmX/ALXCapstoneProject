// QuestionCard.js

import React from 'react'; // Importing React for the functional component

const QuestionCard = ({
  question,
  options,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  onAnswer,
  onNextQuestion,
}) => {
  // Functional component 'QuestionCard' receiving props: question, options, correctAnswer, selectedAnswer, isAnswered, onAnswer, and onNextQuestion

  // Handles answer click event, allows selection only if the question hasn't been answered
  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      onAnswer(answer); // Calls the onAnswer function with the selected answer
    }
  };

  return (
    <div>
      <h2
        className="text-xl font-bold mb-4 text-black"
        dangerouslySetInnerHTML={{ __html: question }} // Render the question content as HTML
      />

      <div className="space-y-3">
        {/* Mapping through the options array to display the answer choices */}
        {options.map((option, index) => (
          <button
            key={index} // Unique key for each option
            onClick={() => handleAnswerClick(option)} // Calls handleAnswerClick with the selected option
            disabled={isAnswered} // Disables buttons after an answer has been selected
            className={`w-full py-2 px-4 rounded-lg text-left
              ${isAnswered && option === correctAnswer ? 'bg-green-500 text-white' : ''} 
              ${isAnswered && option === selectedAnswer && option !== correctAnswer ? 'bg-red-500 text-white' : ''}
              ${!isAnswered ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-300 cursor-not-allowed'}`}
            dangerouslySetInnerHTML={{ __html: option }} // Render each option as HTML
          />
        ))}
      </div>

      {/* Display feedback and next question button only if the question has been answered */}
      {isAnswered && (
        <div className="mt-4 text-center">
          {selectedAnswer === correctAnswer ? (
            <p className="text-green-600 font-semibold">Correct! 🎉</p> 
            // Display "Correct" message if the selected answer is correct
          ) : (
            <p className="text-red-600 font-semibold">
              Incorrect! The correct answer is {correctAnswer}.
            </p>
            // Display "Incorrect" message and show the correct answer
          )}

          {/* Next Question Button */}
          <button
            onClick={onNextQuestion} // Calls onNextQuestion to move to the next question
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Question {/* Button text */}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard; // Exporting the QuestionCard component for use in other parts of the application

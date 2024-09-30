interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onAnswer }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className="border border-gray-300 p-2 rounded"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;

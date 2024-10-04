import React from "react";

interface QuizHistoryItem {
  category: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  date: string;
}

interface QuizHistoryProps {
  history: QuizHistoryItem[];
}

const QuizHistory: React.FC<QuizHistoryProps> = ({ history }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-center mb-4">Quiz History</h2>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((item, index) => (
            <li key={index} className="w-full bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">Category:</span> {item.category}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">Difficulty:</span> {item.difficulty}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">Score:</span> {item.score}/{item.totalQuestions}
                </p>
              </div>
              <div className="text-sm text-gray-500">{item.date}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No quiz history available.</p>
      )}
    </div>
  );
};

export default QuizHistory;

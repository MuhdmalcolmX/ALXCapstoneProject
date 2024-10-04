import React from 'react';

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
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Quiz History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((item, index) => (
            <li key={index} className="mb-3 p-2 bg-gray-100 rounded-lg">
              <p className="text-gray-600">
                <strong>{item.category}</strong> - {item.difficulty} - Score: {item.score}/{item.totalQuestions} - Date: {item.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No quiz history available.</p>
      )}
    </div>
  );
};

export default QuizHistory;

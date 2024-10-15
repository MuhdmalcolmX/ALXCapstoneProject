import React from "react";

// Function to map category number to category name
const getCategoryName = (category) => {
  const categoryMap = {
    "9": "General Knowledge",
    "21": "Sports",
    "23": "History",
    "27": "Animals",
    "17": "Science & Nature",
    "22": "Geography",
    "18": "Science: Computers",
    "28": "Vehicles",
    "10": "Books",
    "24": "Politics",
    // Add other categories as needed
  };
  return categoryMap[category] || "Unknown Category"; // Default to "Unknown Category" if not found
};

const QuizHistory = ({ history }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-center mb-4">Quiz History</h2>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((item, index) => (
            <li key={index} className="w-full bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">Category:</span> {getCategoryName(item.category)}
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

// QuizHistory.js

import React from "react"; // Importing React for the functional component

// Function to map category number to category name
const getCategoryName = (category) => {
  // Object that maps category IDs to category names
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
    "11": "Film",
    "12": "Music",
    "26": "Celebrities",
    "14": "Television",
    "15": "Video Games",
    "31": "Japanese Anime & Manga",
    "32": "Cartoon & Animations",
    // Additional categories can be added here as needed
  };
  return categoryMap[category] || "Unknown Category"; // Return the mapped category name or "Unknown Category" if the category ID isn't found
};

// Functional component to display the quiz history
const QuizHistory = ({ history }) => {
  return (
    <div className="w-full">
      {/* Heading for the quiz history section */}
      <h2 className="text-lg font-semibold text-center mb-4">Quiz History</h2>
      
      {/* Check if there is any quiz history */}
      {history.length > 0 ? (
        // Render the list of quiz history if available
        <ul className="space-y-4">
          {history.map((item, index) => (
            <li
              key={index} // Unique key for each history item
              className="w-full bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between"
            >
              {/* Display quiz details such as category, difficulty, and score */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">Category:</span> {getCategoryName(item.category)}
                  {/* Map the category ID to the category name */}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">Difficulty:</span> {item.difficulty}
                  {/* Display the quiz difficulty */}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">Score:</span> {item.score}/{item.totalQuestions}
                  {/* Display the score out of total questions */}
                </p>
              </div>
              {/* Display the date when the quiz was taken */}
              <div className="text-sm text-gray-500">{item.date}</div>
            </li>
          ))}
        </ul>
      ) : (
        // Message to show when no quiz history is available
        <p className="text-center text-gray-600">No quiz history available.</p>
      )}
    </div>
  );
};

export default QuizHistory; // Exporting the QuizHistory component for use in other parts of the application

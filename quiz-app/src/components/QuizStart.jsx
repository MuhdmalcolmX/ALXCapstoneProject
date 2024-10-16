//QuizStart.js

import React, { useState } from "react"; // Importing React and the useState hook
import QuizHistory from "./QuizHistory"; // Importing the QuizHistory component

const QuizStart = ({ onStartQuiz, quizHistory, onClearHistory }) => { 
  // Functional component 'QuizStart' receiving props: onStartQuiz, quizHistory, and onClearHistory

  // State hooks to manage various states in the component
  const [category, setCategory] = useState(""); // Selected category state
  const [difficulty, setDifficulty] = useState(""); // Selected difficulty state
  const [showHistory, setShowHistory] = useState(false); // State for toggling quiz history popup
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query input
  const [showPopup, setShowPopup] = useState(false); // State for showing the "select category and difficulty" popup

  // List of quiz categories
  const categories = [
    { id: "9", name: "General Knowledge" },
    { id: "21", name: "Sports" },
    { id: "23", name: "History" },
    { id: "27", name: "Animals" },
    { id: "17", name: "Science & Nature" },
    { id: "22", name: "Geography" },
    { id: "18", name: "Science: Computers" },
    { id: "28", name: "Vehicles" },
    { id: "10", name: "Books" },
    { id: "24", name: "Politics" },
    { id: "11", name: "Film" },
    { id: "12", name: "Music" },
    { id: "26", name: "Celebrities" },
    { id: "14", name: "Television" },
    { id: "15", name: "Video Games" },
    { id: "31", name: "Japanese Anime & Manga" },
    { id: "32", name: "Cartoon & Animations" }
  ]; 

  // Filter the categories based on the search query input
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle the start button action, ensures category and difficulty are selected
  const handleStart = () => {
    if (category && difficulty) {
      onStartQuiz(category, difficulty); // Calls the onStartQuiz prop with the selected category and difficulty
    } else {
      setShowPopup(true); // Show the popup if category or difficulty is not selected
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Main container with flex layout, centered items, and responsive design */}

      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-md">
        {/* Inner container with white background, padding, and shadow effect */}
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Mohammed Quiz App</h1>
        {/* Title of the quiz app */}

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-lg mb-2 text-black">Search/Select Category</label>
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for a quiz topic..."
              className="border border-gray-300 p-3 w-full rounded-lg"
              value={searchQuery} // Search query state bound to input value
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
          </div>
          
          {/* Category List with Scroll */}
          <div className="flex flex-col space-y-2 overflow-y-auto rounded-lg text-white custom-scrollbar" style={{ maxHeight: "150px" }}>
            {/* Displays filtered categories with a scrollable list */}
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <button
                  key={cat.id} // Unique key for each category
                  className={`border border-gray-300 p-2 rounded-lg text-left ${
                    category === cat.id ? "bg-blue-300" : ""
                  } hover:bg-blue-400 hover:text-white transition-all duration-300`}
                  // Highlights selected category and adds hover effects
                  onClick={() => setCategory(cat.id)} // Sets selected category
                >
                  {cat.name} {/* Display category name */}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No categories match your search</p> 
              // Message displayed when no categories match the search query
            )}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-4">
          <label className="block text-lg mb-2 text-black">Select Difficulty</label>
          <select
            className="border border-gray-300 p-3 w-full rounded-lg"
            value={difficulty} // Difficulty state bound to select value
            onChange={(e) => setDifficulty(e.target.value)} // Update difficulty on change
          >
            <option value="">Choose Difficulty</option> {/* Default option */}
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Start Quiz Button */}
        <button
          className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300"
          onClick={handleStart} // Start quiz handler function
        >
          Start Quiz {/* Button text */}
        </button>

        {/* Show History Button */}
        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md text-sm hover:bg-green-600 w-full"
          onClick={() => setShowHistory(!showHistory)} // Toggles quiz history popup
        >
          {showHistory ? "Hide History" : "Show History"} {/* Button toggles between show/hide text */}
        </button>
      </div>

      {/* History Popup */}
      {showHistory && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          {/* Popup overlay and centered modal */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 max-h-full overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowHistory(false)} // Closes the history popup
              className="absolute top-2 right-2 bg-gray-500 text-white py-1 px-2 rounded-full hover:bg-gray-600"
            >
              X {/* Close button text */}
            </button>
            <QuizHistory history={quizHistory} /> {/* QuizHistory component to display history */}
            {/* Clear History Button */}
            <button
              onClick={onClearHistory} // Clears the quiz history using the passed prop
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
            >
              Clear History {/* Button to clear history */}
            </button>
          </div>
        </div>
      )}

      {/* Popup for Missing Category and Difficulty */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-8/12 md:w-4/12 text-black">
            <h2 className="text-2xl font-bold mb-4">Alert</h2>
            <p className="mb-6">Please select both category and difficulty!</p> 
            {/* Message to alert the user to select both category and difficulty */}
            <button
              onClick={() => setShowPopup(false)} // Closes the popup
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Okay {/* Button to close the popup */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizStart; // Exporting the QuizStart component for use in other parts of the application

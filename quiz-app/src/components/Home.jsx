//Home.js

import React from "react"; // Importing the React library

const Home = ({ onStart }) => { // Functional component 'Home' receives a prop 'onStart'
  return (
    <div className="w-full min-h-screen from-blue-200 via-purple-300 to-indigo-400 flex flex-col justify-between">
      {/* Container div with full width, minimum height, gradient background, and flex layout */}
      
      {/* Header */}
      <header className="py-4 bg-indigo-600 text-white flex items-center justify-between px-20">
        {/* Header section with padding, indigo background, white text, flex layout for alignment */}
        
        {/* Logo */}
        <div className="flex items-center">
          {/* Logo container with flex layout to align items */}
          <a href="/">
            <img
              src="src/assets/quizlogo.png"  // Image source for the logo
              alt="Quiz App Logo"             // Alternative text
              className="h-10 w-10 mr-2"      // Logo styling
            />
          </a>
          <a href="/"><h1 className="text-xl font-bold">Quiz</h1></a>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6">
          {/* Navigation section with flex layout and spacing between links */}
          <a href="#about" className="text-white hover:text-gray-300">
            About Us {/* Link to the About Us section */}
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact Us {/* Link to the Contact Us section */}
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center flex-grow px-4">
        {/* Main content section with flex layout, centered content, and padding */}
        <h2 className="text-4xl font-bold text-white mb-4">Welcome to the Quiz App!</h2>
        {/* Heading for the welcome message */}
        <p className="text-xl text-white mb-8 max-w-xl mx-auto">
          Test your knowledge across various topics and track your performance over time.
          Click the button below to get started with the quiz!
          {/* Introductory message encouraging users to start the quiz */}
        </p>
        <button
          onClick={onStart} // Button triggers the 'onStart' function passed as a prop
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-indigo-700 transition-colors"
        >
          Start Quiz {/* Button to start the quiz */}
        </button>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-indigo-600 text-white flex justify-between px-20">
        {/* Footer section with padding, indigo background, white text, and space between elements */}
        <div>
          <p>&copy; {new Date().getFullYear()} Quiz App. All Rights Reserved.</p>
          {/* Copyright information with dynamic current year */}
        </div>
        <div>
          <p>Created by Mohammed Sylla</p> {/* Creator's name */}
        </div>
      </footer>
    </div>
  );
};

export default Home; // Exporting the Home component for use in other parts of the application

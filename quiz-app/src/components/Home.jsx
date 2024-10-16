import React from "react";

const Home = ({ onStart }) => {
  return (
    <div className="w-full min-h-screen from-blue-200 via-purple-300 to-indigo-400 flex flex-col justify-between">
      {/* Header */}
      <header className="py-4 bg-indigo-600 text-white flex items-center justify-between px-20">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="src/assets/quizlogo.png" // Make sure the path is correct
            alt="Quiz App Logo"
            className="h-10 w-10 mr-2"
          />
          {/* <h1 className="text-xl font-bold">Quiz App</h1> */}
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6">
          <a href="#about" className="text-white hover:text-gray-300">
            About Us
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact Us
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center flex-grow px-4">
        <h2 className="text-4xl font-bold text-white mb-4">Welcome to the Quiz App!</h2>
        <p className="text-xl text-white mb-8 max-w-xl mx-auto">
          Test your knowledge across various topics and track your performance over time.
          Click the button below to get started with the quiz!
        </p>
        <button
          onClick={onStart}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-indigo-700 transition-colors"
        >
          Start Quiz
        </button>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-indigo-600 text-white flex justify-between px-20">
        <div>
          <p>&copy; {new Date().getFullYear()} Quiz App. All Rights Reserved.</p>
        </div>
        <div>
          <p>Created by Mohammed Sylla</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

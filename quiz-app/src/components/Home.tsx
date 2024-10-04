import React from "react";

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen via-purple-300 to-indigo-400 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to the Quiz App!</h1>
      <p className="text-xl text-white mb-8">
        Test your knowledge across various topics and track your performance over time.
        Click the button below to get started with the quiz!
      </p>
      <button
        onClick={onStart}
        className="bg-indigo-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-indigo-700 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;

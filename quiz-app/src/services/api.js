// src/services/api.js

// Function to fetch quiz categories from the Open Trivia Database API
export const fetchCategories = async () => {
  // Make a GET request to the API to retrieve quiz categories
  const response = await fetch('https://opentdb.com/api_category.php');
  
  // Parse the JSON response
  const data = await response.json();
  
  return data.trivia_categories; // Return the array of trivia categories from the response
};

// Function to fetch quiz questions based on category, number of questions, and difficulty
export const fetchQuestions = async (category, numQuestions, difficulty) => {
  // Construct the API URL dynamically using the category, number of questions, and difficulty level
  const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;
  
  // Make a GET request to the API to retrieve quiz questions
  const response = await fetch(url);
  
  // Parse the JSON response
  const data = await response.json();
  
  return data.results; // Return the array of quiz questions from the response
};

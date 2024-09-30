// src/services/api.ts
export const fetchCategories = async () => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data.trivia_categories; // Returns categories array
};

export const fetchQuestions = async (category: string, numQuestions: number, difficulty: string) => {
  const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results; // Returns an array of questions
};

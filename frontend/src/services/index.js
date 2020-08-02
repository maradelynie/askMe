import axios from "axios";

const baseTrivia = "https://opentdb.com/";
const baseDataBase = "http://localhost:3001/api/testResults/0012";

const apiTrivia = axios.create({
    baseURL: baseTrivia,
});

const apiDataBase = axios.create({
  baseURL: baseDataBase,
});

export async function getCategory()  {
    
    const response = await apiTrivia.get("api_category.php");

    return response.data.trivia_categories
}

export async function getQuestion(categoryId, difficulty)  {
  const response = await apiTrivia.get(`api.php?amount=1&category=${categoryId}&difficulty=${difficulty}&encode=base64`);
  return response.data.results[0]
} 

export async function getResults(categoryId)  {
  const response = await apiDataBase.get(categoryId);
  
  return response.data.records[0].questions
} 

export async function getAllTests()  {
  const response = await apiDataBase.get();
  return response.data.records
} 
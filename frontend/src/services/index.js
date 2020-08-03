import axios from "axios";

const baseTrivia = "https://opentdb.com/";
const baseDataBase = "http://localhost:3001/api/testResults/001";

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
  const response = await apiTrivia.get(`api.php?amount=1&category=${categoryId}&difficulty=${difficulty}&encode=base64&token=${localStorage.getItem('token')}`);
  return response.data.results[0]
} 

export async function getResults(categoryId)  {
  const response = await apiDataBase.get(categoryId);
  return response.data
} 

export async function getAllTests()  {
  const response = await apiDataBase.get();
  return response.data.records
} 
export async function sendAnswerData(categoryId, data)  {
  const response = await apiDataBase.put(categoryId, data);
  return response.data
} 
export async function postStartTrivia(data)  {
  const response = await apiDataBase.post(null, null , data);
  return response.data
} 
export async function validateToken(token)  {
  const response = await apiTrivia.get(`api.php?amount=1&token=${token}`);

  if(response.data.response_code===0){
    return true

  }else if(response.data.response_code===3||response.data.response_code===4){
    const newtoken = await newToken();
    await localStorage.setItem('token', newtoken);
    return false

  }

} 
export async function newToken()  {
  const response = await apiTrivia.get(`api_token.php?command=request`);
  
  return response.data.token;

} 
import React, {useState, useEffect} from 'react';
import { decode } from 'js-base64';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {doIt} from "../../actions";

import ContentHeader from '../../components/contentHeader';
import TriviaQuestion from '../../components/triviaQuestion';

import {validateToken, getQuestion,postStartTrivia,getResults,sendAnswerData,} from '../../services';

export function controllDifficulty (result, resultsArray, difficulty) {
  const difficultyOptions = ["easy","medium", "hard"]
    
  const changeDifficulty = (result) => {
    const index = difficultyOptions.indexOf(difficulty)

    if(result&&index<2){
      difficulty = difficultyOptions[index+1]

    }else if(!result&&index>0){
      difficulty = difficultyOptions[index-1]
    }
  }

  if(resultsArray.length>0&&resultsArray[0]===result){
    changeDifficulty(result)
    resultsArray = [] ;
  }else{
    resultsArray = [result];

  }

  return {resultsArray,difficulty}
};
export async function updateData (resultsList, data ,categoryId) {

  const triviaRecords = [...resultsList, data]
  const newData = await sendAnswerData( categoryId, {questions:triviaRecords})
  
  return newData.newData.questions
}
export function checkEnd(resultsList,numberOfQuestions) {
  if(resultsList.length>=numberOfQuestions-1){
    return true
  }
  return false
}
function shuffleItens(itens){
  const array = itens;
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array
} 


function Trivia(props) {
  const history = useHistory();
  const {categoryId, category} = props.match.params;
  const numberOfQuestions = 10;

  const [question, setQuestion] = useState("")
  const [difficultyChangeCounter, setDifficultyChangeCounter] = useState([])
  const [resultsList, setResultsList] = useState([])

  const dispatch = useDispatch();
  const store = useSelector(state => state);
  console.log(store)

  useEffect(() => {
    dispatch(doIt())
    const start = async () => {
      await checkDataBase()
      setNewQuestion("medium")
    }

    start()
    
    
  }, [])

  useEffect(() => {
      const questionViwerCheck = async () => {
        if(question!==""){
          
          const data = {
            answer: "no response - refreshed or closed page",
            selectedItem:"no response - refreshed or closed page",
            difficulty: "medium", 
            result: false
          }
          const newData = await updateData(resultsList,data,categoryId);
          
          await setResultsList(newData)
          }
      }
      
      questionViwerCheck()
    
  }, [question])

  const checkDataBase = async () => {
    const valid = await validateToken();
    const data = (await getResults(categoryId));
    if(data.records[0]) {

      if(checkEnd(data.records[0].questions ,numberOfQuestions)){
        return history.push("/report/"+ categoryId)
      }
      await setResultsList(data.records[0].questions);

    }else{
        postStartTrivia({data:{ 
          userId: "001",
          category:  categoryId
        }});
      }
      return
  }

  const setNewQuestion = async (difficulty) => {

    const data = await getQuestion( categoryId, difficulty)
    const newDificulty = decode(data.difficulty);
    const newQuestion = {
      question: data.question,
      itens: shuffleItens([...data.incorrect_answers, data.correct_answer ]),
      answer: data.correct_answer,
      difficulty: newDificulty
    }
    setQuestion(newQuestion)

  }

  const HandleAnswer = async (result, selectedItem) => {
    //remove the viewer question data
    resultsList.pop();
    const data = {
        answer:decode(question.answer),
        selectedItem,
        difficulty: question.difficulty, 
        result
    }

    const newData = await updateData(resultsList,data,categoryId);
    await setResultsList(newData)
    if(checkEnd(resultsList,numberOfQuestions)){
      history.push("/report/"+ categoryId)
    };
    
    const newDifficulty = controllDifficulty(result,difficultyChangeCounter,question.difficulty);

    setNewQuestion(newDifficulty.difficulty);
    setDifficultyChangeCounter(newDifficulty.resultsArray)
  }

  return (<>
      
      <div className="trivia__container">
          <div className="category__container">
            <ContentHeader close={true} text={category}/>
          </div>
          <TriviaQuestion answerResult={HandleAnswer} itens={question.itens} question={question.question} difficulty={question.difficulty} answer={question.answer} index={resultsList?.length}/>
        </div>
    </>
  );
}

export default Trivia;


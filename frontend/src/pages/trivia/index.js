import React, {useState, useEffect} from 'react';
import { decode } from 'js-base64';
import {useHistory} from 'react-router-dom'

import ContentHeader from '../../components/contentHeader';
import TriviaQuestion from '../../components/triviaQuestion';

import {validateToken, getQuestion,postStartTrivia,getResults,sendAnswerData,} from '../../services';

function Trivia(props) {
  const history = useHistory();
  const {categoryId, category} = props.match.params;
  const difficultyOptions = ["easy","medium", "hard"]
  const numberOfQuestions = 10;

  const [difficulty, setDifficulty] = useState("medium")
  const [question, setQuestion] = useState("")
  const [itens, setItens] = useState([])
  const [answer, setAnswer] = useState("")
  const [difficultyChangeCounter, setDifficultyChangeCounter] = useState([])
  const [categoryRecordsDataBase, setCategoryRecordsDataBase] = useState([])

  useEffect(() => {
    const start = async () => {
      await checkDataBase()
      setNewQuestion()
    }

    start()
    
  }, [])

  useEffect(() => {
      const questionViwerCheck = () => {
        if(question!==""){
          const triviaRecords = [...categoryRecordsDataBase, {
            answer: "no response - refreshed or closed page",
            selectedItem:"no response - refreshed or closed page",
            difficulty, 
            result: false
          }]
          sendAnswerData( categoryId, {questions:triviaRecords})
          setCategoryRecordsDataBase(triviaRecords)
          }
      }
      
      questionViwerCheck()
    
  }, [question])

  const checkDataBase = async () => {
    const valid = await validateToken();
    const data = await getResults( categoryId)

    if(data.records.length) {
      
      if(data.records[0].questions.length>=numberOfQuestions){
        return history.push("/report/"+ categoryId)
      }else if(valid){
        console.log("valido")
      }

      setCategoryRecordsDataBase(data.records[0].questions);

    }else{
        postStartTrivia({data:{ 
          userId: "001",
          category:  categoryId
        }});
      }
      return
  }
  const setNewQuestion = async (questionDifficulty = difficulty) => {
    const data = await getQuestion( categoryId,questionDifficulty)
    setQuestion(decode(data.question));
    setItens(shuffleItens([...data.incorrect_answers, data.correct_answer ]));
    setAnswer(data.correct_answer);
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
  const HandleAnswer = async (result, selectedItem) => {
    categoryRecordsDataBase.pop();

    const triviaRecords = [...categoryRecordsDataBase, {
      answer:decode(answer),
      selectedItem,
      difficulty, 
      result
    }]

    const newData = await sendAnswerData( categoryId, {questions:triviaRecords})
    await setCategoryRecordsDataBase(newData.newData.questions)

    checkIfItEnded();
    
    const newDifficulty = await controllDifficulty(result);

    setNewQuestion(newDifficulty);
  }
  const controllDifficulty = (result) => {
    // the countes difficultyChangeCounter must will keep the last result if the 
    // question difficulty change it will clean
    if(difficultyChangeCounter.length>0&&difficultyChangeCounter[0]===result){
      setDifficultyChangeCounter([]);
      return changeDifficulty(result)

    }
      setDifficultyChangeCounter([result]);
    
  }
  const changeDifficulty = async (direction) => {
    const index = difficultyOptions.indexOf(difficulty)
    
      if(direction&&index<2){
        setDifficulty(difficultyOptions[index+1])
        return difficultyOptions[index+1]

      }else if(!direction&&index>0){
        setDifficulty(difficultyOptions[index-1])
        return difficultyOptions[index-1]
      }

    

  }
  const checkIfItEnded = () => {
    if(categoryRecordsDataBase.length===numberOfQuestions){
      return history.push("/report/"+ categoryId-1)
    }
  }
  
  return (<>
      
      <div className="trivia__container">
          <div className="category__container">
            <ContentHeader close={true} text={category}/>
          </div>
          <TriviaQuestion answerResult={HandleAnswer} itens={itens} question={question} difficulty={difficulty} answer={answer} index={categoryRecordsDataBase?.length}/>
        </div>
    </>
  );
}

export default Trivia;


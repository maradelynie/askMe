import React, {useState, useEffect} from 'react';
import ContentHeader from '../../components/contentHeader';
import TriviaQuestion from '../../components/triviaQuestion';
import { decode } from 'js-base64';
import {useHistory} from 'react-router-dom'

import {getQuestion,postStartTrivia,getResults,sendAnswerData} from '../../services';


function Trivia(props) {
  const history = useHistory();
  const numberOfQuestions = 10
  const [difficulty, setDifficulty] = useState("medium")
  const [question, setQuestion] = useState("")
  const [itens, setItens] = useState([])
  const [answer, setAnswer] = useState("")
  const difficultyOptions = ["easy","medium", "hard"]
  const [difficultyChangeCounter, setDifficultyChangeCounter] = useState([])
  const [categoryRecordsDataBase, setCategoryRecordsDataBase] = useState([])

  useEffect(() => {
    const checkDataBase = async () => {
      const data = await getResults(props.match.params.categoryId)
      console.log(data)
    if(data.records.length) {
      if(data.records[0].questions.length>=numberOfQuestions-1){
        return history.push("/report/"+props.match.params.categoryId)
      }
      setCategoryRecordsDataBase(data.records[0].questions);
    }else{
      console.log("nao tem")

        postStartTrivia({data:{ 
          userId: "001",
          category: props.match.params.categoryId
        }});
      }
    }

    checkDataBase();
    setNewQuestion();
    
  }, [])

  useEffect(() => {
    if(question!==""){

    const triviaRecords = [...categoryRecordsDataBase, {
      answer: "no response - refreshed or closed page",
      selectedItem:"no response - refreshed or closed page",
      difficulty, 
      result: false
    }]

    sendAnswerData(props.match.params.categoryId, {questions:triviaRecords})

    }
  }, [question])

  const setNewQuestion = async (questionDifficulty = difficulty) => {
    const data = await getQuestion(props.match.params.categoryId,questionDifficulty)
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
    
    const triviaRecords = [...categoryRecordsDataBase, {
      answer:decode(answer),
      selectedItem,
      difficulty, 
      result
    }]

    await sendAnswerData(props.match.params.categoryId, {questions:triviaRecords})

    if(categoryRecordsDataBase.length===numberOfQuestions-1){
      return history.push("/report/"+props.match.params.categoryId)
    }
    setCategoryRecordsDataBase(triviaRecords)
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

  
  
  return (<>
      
      <div className="trivia__container">
          <div className="category__container">
            <ContentHeader close={true} text={props.match.params.category}/>
          </div>
          <TriviaQuestion answerResult={HandleAnswer} itens={itens} question={question} difficulty={difficulty} answer={answer} index={categoryRecordsDataBase.length}/>
        </div>
    </>
  );
}

export default Trivia;


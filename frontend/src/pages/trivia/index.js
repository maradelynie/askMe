import React, {useState, useEffect} from 'react';
import ContentHeader from '../../components/contentHeader';
import TriviaQuestion from '../../components/triviaQuestion';
import { decode } from 'js-base64';
import {useHistory} from 'react-router-dom'

import {getQuestion} from '../../services';


function Trivia(props) {
  const history = useHistory();

  const [difficulty, setDifficulty] = useState("medium")
  const [question, setQuestion] = useState("")
  const [itens, setItens] = useState([])
  const [answer, setAnswer] = useState("")
  const difficultyOptions = ["easy","medium", "hard"]
  const [difficultyChangeCounter, setDifficultyChangeCounter] = useState([])
  const [respostas, setRespostas] = useState([])

  useEffect(() => {
    setNewQuestion();
    
  }, [])

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
  const HandleAnswer = async (result) => {
    //enviar para o bancode dados
    if(respostas.length===2){
      history.push("/report/"+props.match.params.categoryId)
    }
    setRespostas([...respostas, {difficulty, result}])

    const dif = await controllDifficulty(result);
    setNewQuestion(dif);
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
          <TriviaQuestion answerResult={HandleAnswer} itens={itens} question={question} difficulty={difficulty} answer={answer} index={1}/>
        </div>
    </>
  );
}

export default Trivia;


import React, {useState, useEffect} from 'react';
import QuestionLevel from './questionLevel';
import QuestionItem from './questionItem';
import DefaultButton from './defaultButton';
import { decode } from 'js-base64';

import Notification from './notification';

function TriviaQuestion(props) {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationType, setNotificationType] = useState(false)
  const [disableAnser, setDisableAnser] = useState(true)
  const [selected, setSelected] = useState("")

  const selectItem = (el) => { 
    getAllElments().map(item => item.classList.remove("question__item--selected"))
    el.classList.add("question__item--selected");
    setDisableAnser(false)
  }
  const getAllElments = () => {
    const elements = document.querySelectorAll('.question__item');
    var all = [];
    for(var i = elements.length; i--; all.unshift(elements[i]));

    return all
  }
  const answer = async () => {
    const selectedItem = getAllElments().find(element => element.classList.contains("question__item--selected")).innerHTML
    await setSelected(selectedItem)
    if(selectedItem===decode(props.answer)){
      await setNotificationType(true)
    }else {
      await setNotificationType(false)

    }
    setNotificationStatus(true)
  }
  const clearSelection = () => {
    getAllElments().map(item => item.classList.remove("question__item--selected"))
    setDisableAnser(true)
  }
  const clearData = () => {
    document.querySelector('.question__text').innerHTML="&nbsp;";
    getAllElments().map(item => item.innerHTML="&nbsp;")
  }
  
  
  return (
    <>
      <Notification clearData={clearData} clearSelection={clearSelection} action={() => props.answerResult(notificationType, selected)} status={notificationStatus} type={notificationType} setNotificationStatus={setNotificationStatus}/>
      <div className="question__card">
        <div className="question__header">
          <h3 className="question__title"> Question {props.index}</h3>
          <QuestionLevel difficulty={props.difficulty}/>
        </div>
        <p  className="question__text">{props.question? decode(props.question): ""}</p>
        {props.itens?.map((item,index) =>{
          return <QuestionItem key={index} selectItem={selectItem} item={decode(item)} />
        })}
        <div className="trivia__btnContainer">
          <DefaultButton disabled={disableAnser} action={answer} text="Answer"/>
        </div>
      </div>
    </>
  );
}

export default TriviaQuestion;

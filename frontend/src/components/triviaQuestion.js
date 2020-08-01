import React from 'react';
import QuestionLevel from './questionLevel';
import QuestionItem from './questionItem';
import SendButton from './sendButton';

import Notification from './notification';

function TriviaQuestion(props) {

  const selectItem = (el) => {
    getAllElments().map(item => item.classList.remove("question__item--selected"))

    el.classList.add("question__item--selected");
  }
  const getAllElments = () => {
    const elements = document.querySelectorAll('.question__item');
    var all = [];
    for(var i = elements.length; i--; all.unshift(elements[i]));

    return all
  }
  const shuffleArray = (all) => {
    const array = all;
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }
  const send = () => {
    const selected = getAllElments().find(element => element.classList.contains("question__item--selected"))
    console.log(selected.innerHTML)
  }
  const itens = shuffleArray([...props.data.incorrect_answers, props.data.correct_answer ]);

  return (
    <>
      <Notification status={true} type={false} setStatus={"teste"}/>
      <div className="question__card">
        <div className="question__header">
          <h3 className="question__title"> Question {props.index}</h3>
          <QuestionLevel dificulty={props.data.difficulty}/>
        </div>
        <p  className="question__text">{props.data.question}</p>
        {itens?.map((item,index) =>{
          return <QuestionItem key={index} selectItem={selectItem} item={item} />
        })}
        <SendButton action={send} text="Answer"/>
      </div>
    </>
  );
}

export default TriviaQuestion;

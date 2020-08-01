import React from 'react';


function QuestionItem(props) {
  
  return (
    <div onClick={e => props.selectItem(e.target)} className="question__item">
      {props.item}
    </div>
  );
}

export default QuestionItem;

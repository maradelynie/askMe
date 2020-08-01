import React from 'react';

function SendButton(props) {
 
  return (
    <div className="send__container">
      <button onClick={props.action}  className="send__button">
        {props.text}
      </button>
    </div>
  );
}

export default SendButton;

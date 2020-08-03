import React from 'react';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./defaultButton.scss";

function DefaultButton(props) {
 
 const desble = () => {
  if(props.disabled===true){
    return  true
  }
  return false
}
const iconBefore = () => {
  if(props.iconBefore){
    return <FontAwesomeIcon className="icon__dificulty" icon={faArrowRight}/> 
  }
         
}


  return (
    <div className="button__container">
      <button onClick={props.action} disabled={desble()} className="default__button">
        {props.text}
        {iconBefore()}
      </button>
    </div>
  );
}

export default DefaultButton;

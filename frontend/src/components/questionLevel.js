import React from 'react';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function QuestionLevel(props) {
  const renderStars = () =>{
    
    if(props.dificulty==="hard"){
      return (<>
          <FontAwesomeIcon className="icon__dificulty" icon={faStar}/> 
          <FontAwesomeIcon className="icon__dificulty" icon={faStar}/> 
          <FontAwesomeIcon className="icon__dificulty" icon={faStar}/> Hard
        </>
        )
    }else if(props.dificulty==="medium"){
      return (<>
          <FontAwesomeIcon className="icon__dificulty" icon={faStar}/> 
          <FontAwesomeIcon className="icon__dificulty" icon={faStar}/> Medium
        </>
        )
    }else {
      return (<>
          <FontAwesomeIcon className="icon__dificulty" icon={faStar}/> Easy
        </>
        )
    }

  }
  
  return (
    <div  className="dificulty__container">
      {renderStars()}
    </div>
  );
}

export default QuestionLevel;

import React from 'react';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import  "./questionLevel.scss";


function QuestionLevel(props) {
  const renderStars = () =>{
    
    if(props.difficulty==="hard"){
      return (<>
          <FontAwesomeIcon className="icon__difficulty" icon={faStar}/> 
          <FontAwesomeIcon className="icon__difficulty" icon={faStar}/> 
          <FontAwesomeIcon className="icon__difficulty" icon={faStar}/> Hard
        </>
        )
    }else if(props.difficulty==="medium"){
      return (<>
          <FontAwesomeIcon className="icon__difficulty" icon={faStar}/> 
          <FontAwesomeIcon className="icon__difficulty" icon={faStar}/> Medium
        </>
        )
    }else {
      return (<>
          <FontAwesomeIcon className="icon__difficulty" icon={faStar}/> Easy
        </>
        )
    }

  }
  
  return (
    <div  className="difficulty__container">
      {renderStars()}
    </div>
  );
}

export default QuestionLevel;

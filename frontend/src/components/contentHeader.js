import React from 'react';
import Close from '../components/close';
import './contentHeader.scss';

function ContentHeader(props) {
  const renderClose = () => {
    if(props.close){
      return <Close/>
    }
  }
  return (
    <div className="trivia__header">
      <h1 className="trivia__title">{props.text}</h1> 
      {renderClose()}
    </div>
  );
}

export default ContentHeader;

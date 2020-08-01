import React from 'react';
import Close from '../components/close';

function ContentHeader(props) {
  const renderClose = () => {
    if(props.close){
      return <Close/>
    }
  }
  return (
    <div className="category__header">
      <h1 className="category__title">{props.text}</h1> 
      {renderClose()}
    </div>
  );
}

export default ContentHeader;

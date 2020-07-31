import React from 'react';
import ContentHeader from '../../components/contentHeader';

function Trivia(props) {
  return (
    <>
      <ContentHeader close={true} text={props.match.params.category}/>

    </>
  );
}

export default Trivia;


import React from 'react';
import ContentHeader from '../../components/contentHeader';
import TriviaQuestion from '../../components/triviaQuestion';

function Trivia(props) {
  const questions = {
      "category": "Celebrities",
      "type": "multiple",
      "difficulty": "easy",
      "question": "Which famous New York Yankees outfielder did Marilyn Monroe marry?",
      "correct_answer": "Joe DiMaggio",
      "incorrect_answers": [
        "Tino Martinez",
        "Babe Ruth",
        "Mason Williams"
      ]
    }
  
    
  
  return (<>
      
      <div className="trivia__container">
          <div className="category__container">
            <ContentHeader close={true} text={props.match.params.category}/>
          </div>
          <TriviaQuestion data={questions} index={1}/>
        </div>
    </>
  );
}

export default Trivia;


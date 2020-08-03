import React, {useState, useEffect} from 'react';
import DefaultButton from '../../components/defaultButton';
import MonterDrawing from '../../components/monterDrawing';
import {useHistory} from 'react-router-dom'
import {getResults} from '../../services';

import {useSelector} from "react-redux";

function Report() {
  const history = useHistory();
  const [results, setresults] = useState({})

  const {categoryId, categoryName} = useSelector(state => state);


  useEffect(() => {
    console.log(categoryId)
    console.log(categoryName)
    const id = String(categoryId)
    const getData = async () => {
      formatData(await getResults(id))
    }
    getData();
  },[])

  const formatData = (response) => {
    const data = response.records[0].questions
    const formated = {
      correct: data.filter(item => item.result===true).length,
      wrong: data.filter(item => item.result===false).length,
      easy: {
        correct: data.filter(item => item.difficulty==="easy").filter(item => item.result===true).length,
        wrong: data.filter(item => item.difficulty==="easy").filter(item => item.result===false).length
      },
      medium: {
        correct: data.filter(item => item.difficulty==="medium").filter(item => item.result===true).length,
        wrong: data.filter(item => item.difficulty==="medium").filter(item => item.result===false).length
      },
      hard: {
        correct: data.filter(item => item.difficulty==="hard").filter(item => item.result===true).length,
        wrong: data.filter(item => item.difficulty==="hard").filter(item => item.result===false).length
      },
    }
    setresults(formated)
  }
  
  return (
    <>
    <main className="Main__container">
      <div  className="report__card">
        <div className="report__header">
          <MonterDrawing />
          <div  className="report__headerText"><h2>Congratulations!</h2><span>Your finished your {categoryName} test.</span></div>
        </div>
        <div className="report__performanceCard">
          <h3>Check out your performance</h3>
        </div>

        <div className="report__results">
          <label>
            <span className="report__resultsNumber">
              {results?.correct}
            </span>
            Correct
          </label>
          <label>
            <span className="report__resultsNumber">
            {results?.wrong}
            </span>
            Wrong
          </label>
          
          
        </div>
        <div className="report__detailsList">
          <div className="report__details">
            <div className="report__data">
            <h4>Easy</h4>
            <p>Correct: {results?.easy?.correct}</p>
            <p>Wrong: {results?.easy?.wrong}</p>
            </div>
          </div>
          <div className="report__details">
          <div className="report__data">
            <h4>Medium</h4>
            <p>Correct: {results?.medium?.correct}</p>
            <p>Wrong: {results?.medium?.wrong}</p>
            </div>
          </div>
          <div className="report__details">
          <div className="report__data">
            <h4>Hard</h4>
            <p>Correct: {results?.hard?.correct}</p>
            <p>Wrong: {results?.hard?.wrong}</p>
            </div>
          </div>
        </div>
        <div  className="report__btnContainer">
          <DefaultButton action={() => history.push("/")} text="Back to Home"/>
        </div>
      </div>
    </main>
    </>
  );
}

export default Report;

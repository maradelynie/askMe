import React from 'react';
import DefaultButton from '../../components/defaultButton';

function Report() {
  return (
    <>
    <main className="Main__container">
      <div  className="report__card">
        <div className="report__header">
          <div className="report__image">
            <div className="imge-shadow"></div>
            <div className="imge-body"></div>
            <div className="imge-arms"></div>
            <div className="imge-leg1"></div>
            <div className="imge-feet1"></div>
            <div className="imge-leg2"></div>
            <div className="imge-feet2"></div>
            <div className="imge-mouth"></div>
            <div className="imge-mouth2"></div>
            <div className="imge-mouth3"></div>
            <div className="imge-eye1"></div>
            <div className="imge-eye2"></div>
            <div className="imge-hat1"></div>
          </div>
          <div  className="report__headerText"><h2>Congratulations!</h2><span>Você finalizou o teste</span></div>
        </div>
        <div className="report__performanceCard">
          <h3>Check out your performance</h3>
        </div>

        <div className="report__results">
          <label>
            <span className="report__resultsNumber">
              7
            </span>
            Correct
          </label>
          <label>
            <span className="report__resultsNumber">
              3
            </span>
            Wrong
          </label>
          
          
        </div>
        <div className="report__detailsList">
          <div className="report__details">
            <div className="report__data">
            <h4>Easy</h4>
            <p>Correct: 2</p>
            <p>Wrong: 1</p>
            </div>
          </div>
          <div className="report__details">
          <div className="report__data">
            <h4>Medium</h4>
            <p>Correct: 3</p>
            <p>Wrong: 1</p>
            </div>
          </div>
          <div className="report__details">
          <div className="report__data">
            <h4>Hard</h4>
            <p>Correct: 2</p>
            <p>Wrong: 1</p>
            </div>
          </div>
        </div>
        <DefaultButton action={"send"} text="Back to Home"/>

      </div>
    </main>
    </>
  );
}

export default Report;

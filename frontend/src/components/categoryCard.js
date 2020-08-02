import React from 'react';

function CatergoryCard(props) {
  let status = ""
  if(props.questions>=10){
    status = "--complete"
  }

  return (
    <>
        <div onClick={props.onClick} className={"category__card" + status} ><div className="card__content"><h3>{props.category}</h3></div></div>
    </>
  );
}

export default CatergoryCard;

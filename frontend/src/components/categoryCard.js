import React from 'react';

function CatergoryCard(props) {

  return (
    <>
        <div onClick={props.onClick} className={"category__card" + props.status()} ><div className="card__content"><h3>{props.category}</h3></div></div>
    </>
  );
}

export default CatergoryCard;

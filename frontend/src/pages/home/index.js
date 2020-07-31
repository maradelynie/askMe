import React from 'react';
import ContentHeader from '../../components/contentHeader';

function Home() {
  return (
    <>
      <ContentHeader close={false} text="Categorias"/>
      <div className="category__grid">

        <div className="category__card"><div className="card__content">historia</div></div>
        <div className="category__card"><div className="card__content">Georafia</div></div>
        <div className="category__card"><div className="card__content">Mitologia</div></div>
        <div className="category__card"><div className="card__content">Esportes</div></div>
        <div className="category__card"><div className="card__content">Politicas</div></div>
      </div>
    </>
  );
}

export default Home;

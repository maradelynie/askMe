import React from 'react';
import ContentHeader from '../../components/contentHeader';
import CategoryCard from '../../components/categoryCard';

function Home() {
  return (
    <>
    <div className="category__container">
      <ContentHeader close={false} text="Categorias"/>
    </div>
      <div className="category__grid">

        <CategoryCard category="História" />
        <CategoryCard category="Geografia" />
        <CategoryCard category="Mitologia" />
        <CategoryCard category="Esportes" />
        <CategoryCard category="Politica" />
        <CategoryCard category="Conhecimento Geral" />
        
      </div>
    </>
  );
}

export default Home;

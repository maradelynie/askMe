import React from 'react';
import Routes from './routes';
import Header from './components/header';

import './global.scss';

function App() {
  return (
    <>
    <Header/>
    <main className="main__container">
      <Routes/> 
    </main>
    </>
  );
}

export default App;

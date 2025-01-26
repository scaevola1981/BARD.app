import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './assets/NavBar/navBar';
import Header from './assets/header/header';
import Categories from './assets/Categories/categories';
import Card from './assets/Card/card'
import './index.css';

function App() {
  return (
    <div>
      <Header/>
      <NavBar/>
      <Categories/>
      <Card/>
    </div>
  );
}

export default App;

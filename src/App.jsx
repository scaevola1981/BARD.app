import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './assets/NavBar/navBar';
import Header from './assets/Header/header';
import Categories from './assets/Categories/categories';
import Card from './assets/Card/card';
import Footer from './assets/Footer/footer';
import './index.css';

function App() {
  return (
    <div>
      <Header/>
      <NavBar/>
      <Categories/>
      <Card/>
      <Footer/>
    </div>
  );
}

export default App;

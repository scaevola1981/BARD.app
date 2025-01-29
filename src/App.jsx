
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/Components/home';
import Pages from './assets/Pages/pages';
import './index.css';

function App() {
  return (
    <Router>
     <Home/>
     <Pages/>
    </Router>
  );
}

export default App;

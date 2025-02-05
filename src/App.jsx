import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/Components/home';
import Chat from './assets/Pages/Chat/chat';
import Favorite from './assets/Pages/Favorite-icon-from-header/cautari-salvate_page';
import AnunturiFavorite from './assets/Pages/Favorite-icon-from-header/anunturi-favorite-page';
import './index.css';

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path='/cautari-salvate_page' element={<Favorite/>}/>
        <Route path='/anunturi-favorite' element={<AnunturiFavorite/>}/>
      </Routes>

  );
};

export default App;

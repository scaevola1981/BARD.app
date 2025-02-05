import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/Components/home';
import Chat from './assets/Pages/Chat/chat';
import Favorite from './assets/Pages/Favorite-icon-from-header/cautari-salvate-page';
import AnunturiFavorite from './assets/Pages/Favorite-icon-from-header/anunturi-favorite-page';
import './index.css';
import VazuteRecent from './assets/Pages/Favorite-icon-from-header/vazute-recent-page';

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path='/cautari-salvate-page' element={<Favorite/>}/>
        <Route path='/anunturi-favorite' element={<AnunturiFavorite/>}/>
        <Route path='/vazute-recent' element={<VazuteRecent/>}/>
      </Routes>

  );
};

export default App;

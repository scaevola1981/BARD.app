import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/Components/home';
import Chat from './assets/Pages/Chat/chat';
import './index.css';
import Favorite from './assets/Pages/Favorite-icon/favorite';

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path='/favorite' element={<Favorite/>}/>
      </Routes>

  );
}

export default App;

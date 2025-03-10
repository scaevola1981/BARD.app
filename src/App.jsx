import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/Components/home';
import Chat from './assets/Pages/Chat/chat';
import './index.css';
import Favorite from './assets/Pages/Favorite-icon/favorite';
import Modal from './assets/Components/Modal/modal-component';
import Account from './assets/Pages/MyAccount-icon/account-page';
import AnunturiFavorite from './assets/Pages/Notifications-icon/notificari';
import SearchPage from './assets/Pages/SearchPage/search-page';
import AddPostForm from './assets/Pages/FormAddPost/AddPostForm';
import AuthModals from './assets/Pages/AuthentificationModals/authModals';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/notifications" element={<Modal />} />
        <Route path="/account-page" element={<Account />} />
        <Route path="/anunturi-favorite" element={<AnunturiFavorite />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/anunturi" element={<SearchPage />} />
        <Route path="/addPostForm" element={<AddPostForm />} />
        <Route path='/authModals' element={<AuthModals/>}/>
      </Routes>
    
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/Components/home';
import Chat from './assets/Pages/Chat/chat';
import './index.css';
import Favorite from './assets/Pages/Favorite-icon/favorite';
import AnunturiFavorite from './assets/Pages/Notifications-icon/notificari';
import SearchPage from './assets/Pages/SearchPage/search-page';
import AddPostForm from './assets/Pages/FormAddPost/AddPostForm';
import AuthLayout from './assets/Pages/AuthLayout/authentification-page';
import AccountPage from './assets/Pages/MyAccount-icon/account-page';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/favorite" element={<Favorite />} />
        {/* <Route path="/notifications" element={<AnunturiFavorite />} /> */}
        <Route path="/anunturi-favorite" element={<AnunturiFavorite />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/anunturi" element={<SearchPage />} />
        <Route path="/addPostForm" element={<AddPostForm />} />
        <Route path="/authentification-page" element={<AuthLayout />} />
        <Route path='/account-page' element={<AccountPage />}/>
        <Route path='/notificari' element={<AnunturiFavorite/>}/>
       
      </Routes>
    
  );
}

export default App;

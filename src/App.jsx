import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/Components/Home/home';
import Chat from './assets/Pages/Chat/chat';
import './index.css';
import Favorite from './assets/Pages/Favorite-icon/favorite';
import Notifications from './assets/Pages/Notifications-icon/notificari';
import SearchPage from './assets/Pages/SearchPage/search-page';
import AddPostForm from './assets/Pages/FormAddPost/AddPostForm';
import AuthLayout from './assets/Pages/AuthLayout/authentification-page';
import AccountPage from './assets/Pages/MyAccount-icon/account-page';
import RegisterPage from './assets/Pages/Register/register';
import AllAdsPage from './assets/Pages/AllAdsPage/allAdsPage';
import DbContent from './assets/Pages/DatabaseInteraction/dbContent';
import AdDetails from './assets/Pages/AdDetails/adDetails';
import Card from './assets/Components/Card/Card'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/notificari" element={<Notifications />} />
      <Route path="/cautare" element={<SearchPage />} />
      <Route path="/addPostForm" element={<AddPostForm />} />
      <Route path="/authentification-page" element={<AuthLayout />} />
      <Route path="/account-page" element={<AccountPage />} />
      <Route path="/inregistrare" element={<RegisterPage />} />
      <Route path='/anunturi-noi' element={<Card/>}/>
      <Route path="/anunturi" element={<AllAdsPage />} />
      <Route path="/ads" element={<DbContent/>} />
      <Route path='/ad/:id' element={<AdDetails/>}/>
    </Routes>
  );
}

export default App;

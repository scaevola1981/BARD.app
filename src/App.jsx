import { Routes, Route } from 'react-router-dom';
import ThemeProvider from './api/ThemeProvider';
import Home from './assets/Pages/Home/home';
import Chat from './assets/Components/Chat/chat';
import Favorite from './assets/Pages/Favorite-icon/favorite';
import Notifications from './assets/Pages/Notifications-icon/notificari';
import SearchPage from './assets/Pages/SearchPage/searchPage';
import AddPostForm from './assets/Pages/FormAddPost/AddPostForm';
import AccountPage from './assets/Pages/MyAccount-icon/account-page';
import AllAdsPage from './assets/Pages/AllAdsPage/allAdsPage';
import DbContent from './assets/Pages/DatabaseInteraction/dbContent';
import AdDetails from './assets/Pages/AdDetails/adDetails';
import Card from './assets/Components/Card/card';
import AuthLayout from "./assets/Pages/Register/register";


function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/notificari" element={<Notifications />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/addPostForm" element={<AddPostForm />} />
        <Route path="/account-page" element={<AccountPage />} />
        <Route path="/anunturi-noi" element={<Card />} />
        <Route path="/anunturi" element={<AllAdsPage />} />
        <Route path="/ads" element={<DbContent />} />
        <Route path="/ad/:id" element={<AdDetails />} />
        <Route path="/register" element={<AuthLayout />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;


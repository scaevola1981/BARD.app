import './header.css';
import { FaRegComment, FaRegHeart, FaRegBell, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomModal from '../Modal/modal-component';
import '../../Pages/Notifications-icon/notificari-module.css';
import '../../Pages/MyAcount-icon/account-module.css';

const Header = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const toggleAccountModal = () => {
    setIsAccountModalOpen(!isAccountModalOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <>
      <div className="header-container">
        <header className="header">
          <div className="logo-container">
            <img className="logo-img" src="./foto-icons/logo-5-app-bard.png" alt="Logo" />
          </div>

          <div className="header-icons">
            <Link to="/chat" className="chat-icon" aria-label="Chat">
              <FaRegComment className="chat-icon-svg" />
              <span className="chat-span">Chat</span>
            </Link>

            <Link to="/favorite" className="favorite-icon" aria-label="Favorite">
              <FaRegHeart className="heart-icon" />
            </Link>

            <button onClick={toggleNotificationModal} className="notification-icon" aria-label="Notificări">
              <FaRegBell className="bell-icon" />
            </button>

            <button className="my-account-icon" aria-label="account" onClick={toggleAccountModal}>
              <FaRegUser className="user-name-icon" />
              <span className="account-span">Contul meu</span>
            </button>
          </div>

          <button className="header-btn" aria-label="Login" onClick={toggleLoginModal}>
            Login
          </button>
        </header>
      </div>

      {/* Modal Notificări */}
      <CustomModal title="Notificări" isOpen={isNotificationModalOpen} onClose={toggleNotificationModal} className="notificari-header-modal" />

      {/* Modal Contul meu */}
      <CustomModal title="Contul meu" isOpen={isAccountModalOpen} onClose={toggleAccountModal} className="account-header-modal" position="top-right" />

      {/* Modal Login */}
      <CustomModal title="Autentificare" isOpen={isLoginModalOpen} onClose={toggleLoginModal} className="login-header-modal">
        <form className="login-form login-modal">
          <label>Username:</label>
          <input type="text" placeholder="Introduceți username" required />
          <label>Parolă:</label>
          <input type="password" placeholder="Introduceți parola" required />
          <button type="submit" className="login-btn">Autentificare</button>
        </form>
      </CustomModal>
    </>
  );
};

export default Header;


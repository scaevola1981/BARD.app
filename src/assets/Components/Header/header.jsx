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

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const toggleAccountModal = () => {
    setIsAccountModalOpen(!isAccountModalOpen);
  };

  return (
    <>
      <div className="header-container">
        <header className="header">
          <div className="logo-container">
            <img
              className="logo-img"
              src="./foto-icons/logo-3-app-bard.png"
              alt="Logo"
            />
          </div>

          <div className="header-icons">
            <Link to="/chat" className="chat-icon" aria-label="Chat">
              <FaRegComment className="chat-icon-svg" />
              <span className="chat-span">Chat</span>
            </Link>

            <Link
              to="/favorite"
              className="favorite-icon"
              aria-label="Favorite"
            >
              <FaRegHeart className="heart-icon" />
            </Link>

            <button
              onClick={toggleNotificationModal}
              className="notification-icon"
              aria-label="Notificări"
            >
              <FaRegBell className="bell-icon" />
            </button>

            <button
              className="my-account-icon"
              aria-label="account"
              onClick={toggleAccountModal}
            >
              <FaRegUser className="user-name-icon" />
              <span className="account-span">Contul meu</span>
            </button>

            <CustomModal
              title="Notificări"
              isOpen={isNotificationModalOpen}
              onClose={toggleNotificationModal}
              className="notificari-header-modal"
            ></CustomModal>

            <CustomModal
              title="Contul meu"
              isOpen={isAccountModalOpen}
              onClose={toggleAccountModal}
              className="account-header-modal"
              position="top-right"
            ></CustomModal>
          </div>

          <button className="header-btn" aria-label="Adăuga anunț">
            Adaugă anunț
          </button>
        </header>
      </div>
    </>
  );
};

export default Header;

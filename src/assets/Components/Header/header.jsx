import './header.css';
import {
  FaRegComment,
  FaRegHeart,
  FaRegBell,
  FaRegUser,
  FaUser,
  FaLock,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomModal from '../Modal/modal-component';
import '../../Pages/Notifications-icon/notificari-module.css';
import '../../Pages/MyAcount-icon/account-module.css';

const Header = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const toggleAccountModal = () => {
    setIsAccountModalOpen(!isAccountModalOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    toggleLoginModal();
    setUserName('');
    setPassword('');
  };

  return (
    <>
      <div className="header-container">
        <header className="header">
          <div className="logo-container">
            <img
              className="logo-img"
              src="./foto-icons/logo-5-app-bard.png"
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
          </div>

          <button
            className="header-btn"
            aria-label="Login"
            onClick={toggleLoginModal}
          >
            Login
          </button>
        </header>
      </div>

      {/* Modal Notificări */}
      <CustomModal
        title="Notificări"
        isOpen={isNotificationModalOpen}
        onClose={toggleNotificationModal}
        className="notificari-header-modal"
      />

      {/* Modal Contul meu */}
      <CustomModal
        title="Contul meu"
        isOpen={isAccountModalOpen}
        onClose={toggleAccountModal}
        className="account-header-modal"
        position="top-right"
      />

      {/* Modal Login */}
      <CustomModal
        title="Autentificare"
        isOpen={isLoginModalOpen}
        onClose={toggleLoginModal}
        className="login-header-modal"
      >
        <form className="login-form login-modal" onSubmit={handleLoginSubmit}>
          <h1>🫣 WELCOME </h1>
          <div className="input-container">
            <input
              type="text"
              placeholder=" Username"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Parola"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password</a>
          </div>
          
          <button type="submit" className="login-btn">
            Autentificare
          </button>

          <div className="register-link">
            <p>
              Don&apos;t have an account ? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default Header;


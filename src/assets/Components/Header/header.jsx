import './header.css';
import { FaRegComment, FaRegHeart, FaRegBell, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
      <header className="header">
        <div className="logo-container">
          <img
            className="logo-img"
            src="./foto-icons/logo-4-app-bard.png"
            alt="Logo"
          />
        </div>

        <div className="header-icons">
          <Link to="/chat" className="chat-icon" aria-label="Chat">
            <FaRegComment className="chat-icon-svg" />
            <span className="chat-span">Chat</span>
          </Link>

          <Link to="/favorite" className="favorite-icon" aria-label="Favorite">
            <FaRegHeart className="heart-icon" />
          </Link>

          <button
            className="notification-icon"
            aria-label="Notificări"
            onClick={() => alert('Notificări')}
          >
            <FaRegBell />
          </button>

          <div className="my-account-icon">
            <FaRegUser className="user-name-icon" />
            <span className="account-span">Contul meu</span>
          </div>
        </div>

        <button className="header-btn" aria-label="Adăuga anunț">
         Login
        </button>
      </header>
    </div>
  );
};

export default Header;

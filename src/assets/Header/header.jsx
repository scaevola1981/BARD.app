import './header.css';
import { FaComment, FaHeart, FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="header-container container-fluid">
      <header className="header">
        <div className="header-icons">
          <div className="chat-icon">
            <FaComment />
          </div>
          <FaHeart className="heart-icon" />
          <FaBell className="notification-icon" />
          <div className="my-account-icon">
            <FaUser className="account-icon" />
          </div>
        </div>
        <button className="header-btn"> Adauga anunt</button>
      </header>
    </div>
  );
};

export default Header;

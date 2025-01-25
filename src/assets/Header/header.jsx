import './header.css';
import { FaComment, FaHeart, FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="header-container container-fluid">
      
      <header className="header">
        <div className='logo-container'>
          <img className='logo-img' src="../public/foto-icons/logo.jpg" alt="Logo" />
        </div>
        <div className="header-icons">
          <div className="chat-icon">
             <FaComment />
             <span className='chat-span'>Chat</span>
          </div>
             <FaHeart className="heart-icon" />
             <FaBell className="notification-icon" />
          <div className="my-account-icon">
             <FaUser/>
            <span className="account-span">Contul meu</span>
          </div>
        </div>
        <button className="header-btn"> Adauga anunt</button>
      </header>
    </div>
  );
};

export default Header;

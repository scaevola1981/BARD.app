import './header.css';
import { FaRegComment, FaRegHeart, FaRegBell, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container container-fluid">
      
      <header className="header">
        <div className='logo-container'>
          <img className='logo-img' src="./foto-icons/logo.jpg" alt="Logo" />
        </div>
        <div className="header-icons">
          <div className="chat-icon">
             <FaRegComment />
             <span className='chat-span'>Chat</span>
          </div>
             <FaRegHeart className="heart-icon" />
             <FaRegBell className="notification-icon" />
          <div className="my-account-icon">
             <FaRegUser className='user-name-icon'/>
            <span className="account-span">Contul meu</span>
          </div>
        </div>
        <button className="header-btn"> Adauga anunt</button>
      </header>
    </div>
  );
};

export default Header;

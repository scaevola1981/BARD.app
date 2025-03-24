import styles from './header.module.css';
import { FaRegComment, FaRegHeart, FaRegBell, FaRegUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const goToAddPostForm = () => {
    navigate('/addPostForm');
  };

  const goToNotifications = () => {
    navigate('/notificari')
  }

  const goToMyAccount = () => {
    navigate('/account-page')
  }

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logoImg}
            src="./foto-icons/logo-5-app-bard.png"
            alt="Logo"
          />
        </div>

        <div className={styles.headerIcons}>
          {/* Butonul Adaugă Anunț mutat aici */}

          <Link to="/chat" className={styles.chatIcon} aria-label="Chat">
            <FaRegComment className={styles.chatIconSvg} />
            <span className={styles.chatSpan}>Chat</span>
          </Link>

          <Link
            to="/favorite"
            className={styles.favoriteIcon}
            aria-label="Favorite"
          >
            <FaRegHeart className={styles.heartIcon} />
          </Link>

          <button className={styles.notificationIcon} aria-label="Notificări" onClick={goToNotifications} >
            <FaRegBell className={styles.bellIcon} />
          </button>

          <Link to="/account-page">
            <button className={styles.myAccountIcon} aria-label="account" onClick={ goToMyAccount}>
              <FaRegUser className={styles.userNameIcon} />
              <span className={styles.accountSpan}>Contul meu</span>
            </button>
          </Link>
          <button className={styles.addPostBtn} onClick={goToAddPostForm}>
            Adaugă Anunț
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;

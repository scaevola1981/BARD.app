import styles from './header.module.css';
import {
  FaRegComment,
  FaRegHeart,
  FaRegBell,
  FaRegUser,
  FaHeart,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../../../api/themeContext';

const Header = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [hasNotifications, setHasNotifications] = useState(false);

  

  useEffect(() => {
    const checkNotifications = () => {
      const notifications =
        JSON.parse(localStorage.getItem('notifications')) || [];
      setHasNotifications(notifications.length > 0);
    };

    checkNotifications();

    const handleStorageChange = () => {
      checkNotifications();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.length > 0);

    const handleStorageChange = () => {
      const updatedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || [];
      setIsFavorite(updatedFavorites.length > 0);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const goToAddPostForm = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      navigate('/addPostForm');
    } else {
      localStorage.setItem('redirectTo', 'AddPostForm');
      navigate('/AddPostForm');
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToNotifications = () => {
    navigate('/notificari');
  };

  const goToMyAccount = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/account-page');
    } else {
      navigate('/register');
    }
  };

  return (
    <>
      <div className={`${styles.headerContainer} header-container`}>
        <div className={styles.logoContainer}>
          <button className={styles.buttonHome} onClick={goToHome}>
            <img
              className={styles.logoImg}
              src="./foto-icons/logo-5-app-bard.png"
              alt="Logo"
            />
          </button>
        </div>
        <header className={styles.header}>
          <div className={styles.headerIcons}>
            <Link to="/chat" className={styles.chatIcon} aria-label="Chat">
              <FaRegComment className={styles.chatIconSvg} />
            </Link>
            <Link
              to="/favorite"
              className={styles.favoriteIcon}
              aria-label="Favorite"
            >
              {isFavorite ? (
                <FaHeart className={styles.heartIconFilled} />
              ) : (
                <FaRegHeart className={styles.heartIcon} />
              )}
            </Link>
            <button
              className={styles.notificationIcon}
              aria-label="Notificări"
              onClick={goToNotifications}
            >
              <div className={styles.notificationWrapper}>
                <FaRegBell className={styles.bellIcon} />
                {hasNotifications && (
                  <span className={styles.notificationBadge}></span>
                )}
              </div>
            </button>
            <button
              className={styles.myAccountIcon}
              aria-label="account"
              onClick={goToMyAccount}
            >
              <FaRegUser className={styles.userNameIcon} />
            </button>
            <button className={styles.addPostBtn} onClick={goToAddPostForm}>
              Adaugă Anunț
            </button>
            {/* Mutăm butonul de temă în interiorul headerIcons */}
            <button
              onClick={toggleTheme}
              className={styles.themeButton}
              aria-label={
                theme === 'light'
                  ? 'Switch to Dark Mode'
                  : 'Switch to Light Mode'
              }
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;

import styles from './header.module.css';
import { FaRegComment, FaRegHeart, FaRegBell, FaRegUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; 


const Header = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() =>{
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorites(storedFavorites.length > 0);

    const handleStorageChange = ()
  })

  const goToAddPostForm = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/addPostForm');
    }else {
      localStorage.setItem('redirectTo', 'AddPostForm')
      navigate('/authentification-page')
    }    
  };

  const goToHome = () => {
    navigate('/')
  };

  const goToNotifications = () => {
    navigate('/notificari')
  }

  const goToMyAccount = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/account-page');
    }else {
      navigate('/authentification-page')
    }
   }
   return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <button className={styles.buttonHome} onClick={goToHome}>
            <img
              className={styles.logoImg}
              src="./foto-icons/logo-5-app-bard.png"
              alt="Logo"
            />
          </button>
        </div>

        <div className={styles.headerIcons}>
          <Link to="/chat" className={styles.chatIcon} aria-label="Chat">
            <FaRegComment className={styles.chatIconSvg} />
            <span className={styles.chatSpan}>Chat</span>
          </Link>

          <Link to="/favorite" className={styles.favoriteIcon} aria-label="Favorite">
  {isFavorite ? (
    <FaHeart className={styles.heartIconFilled} />
  ) : (
    <FaRegHeart className={styles.heartIcon} />
  )}
</Link>


          <button className={styles.notificationIcon} aria-label="Notificări" onClick={goToNotifications}>
            <FaRegBell className={styles.bellIcon} />
          </button>

          <button className={styles.myAccountIcon} aria-label="account" onClick={goToMyAccount}>
            <FaRegUser className={styles.userNameIcon} />
            <span className={styles.accountSpan}>Contul meu</span>
          </button>

          <button className={styles.addPostBtn} onClick={goToAddPostForm}>
            Adaugă Anunț
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;

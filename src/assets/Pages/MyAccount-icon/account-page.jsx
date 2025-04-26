import { useTheme } from '../../../api/themeContext'; // Corectează calea după necesități
import Header from '../../Components/Header/header';
import styles from './account.module.css';
import { Link } from 'react-router-dom'; // Folosește 'react-router-dom' în loc de 'react-router'

const AccountPage = () => {
  const { theme } = useTheme(); // Obține tema din context

  return (
    <>
    <Header />
    <div className={`${styles.accountPage} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      
      <div className={styles.accountContent}>
        <h2>Pagina contului meu</h2>
        <p>Bine ai venit în contul tău!</p>
        <Link to='/authentification-page'>
          <button className={styles.authButton}>
            Autentificare
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default AccountPage;

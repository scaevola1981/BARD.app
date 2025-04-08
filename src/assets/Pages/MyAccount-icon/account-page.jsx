import Header from '../../Components/Header/header'; 
import NavBar from '../../Components/NavBar/navBar';
import styles from './account.module.css';
import { Link } from 'react-router';



const AccountPage = () => {




  return (
    <>
    
    <div className={styles.accountPage}>
    <Header />
    <NavBar />
      <h2>Pagina contului meu</h2>
      <p>Bine ai venit în contul tău!</p>
     <Link to='/authentification-page'>
       <button >
        Autentificare
        </button>
     </Link>
    </div>
    </>
  );
};

export default AccountPage;
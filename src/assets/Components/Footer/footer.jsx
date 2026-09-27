import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>
          <img
            src="/foto-icons/logo-6-app-exvero.png"
            alt="BARD Logo"
            className={styles.logo}
          />
          <span className={styles.brandText}>
            © {new Date().getFullYear()} <strong>BARD.app</strong> — Platformă sigură de schimburi
          </span>
        </div>

        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            Acasă
          </Link>
          <Link to="/chat" className={styles.link}>
            Mesaje
          </Link>
          <Link to="/favorite" className={styles.link}>
            Favorite
          </Link>
          <Link to="/register" className={styles.link}>
            Contul meu
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

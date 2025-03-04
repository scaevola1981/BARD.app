import Header from '../../Components/Header/header';
import { FaTrash, FaBookmark, FaTruck } from 'react-icons/fa';
import styles from './chat.module.css';  

const Chat = () => {
  return (
    <div className={styles.chatPageContainer}>
      <Header />

      <div className={styles.navBarChatContainer}>
        <p>De lucrat pe viitor (adaugare continut) !!</p>
        <nav className={styles.navBarChat}>
          <button className={styles.myAdsBtn}>Anunțurile mele</button>
          <button className={styles.chatBtn}>Chat</button>
          <button className={styles.exchangesBtn}>Schimburi</button>
          <button className={styles.ratingsBtn}>Ratinguri</button>
          <button className={styles.deliveryBtn}>
            <FaTruck className={styles.truckIconBtn} />
            Curier
          </button>
          <button className={styles.clientProfileBtn}>Profil client</button>
          <button className={styles.chatSettingsBtn}>Setări</button>
        </nav>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.favoritIconTrashIconContainer}>
          <button className={styles.favoritesBtn}>
            <FaBookmark className={styles.favoritesIcon} />
            <span>Favorite</span>
          </button>
          <button className={styles.recycleBinBtn}>
            <FaTrash className={styles.recycleBinIcon} />
            <span>Mesaje șterse</span>
          </button>
          <div className={styles.customerListContainer}>
            <button className={styles.changeBtn}>Schimbat</button>
            <button className={styles.forChangeBtn}>De schimbat</button>
            <img
              className={styles.iconListChat}
              src="/foto-icons/icon-mesagerie.jpg"  // Evită folosirea "public/"
              alt="Mesagerie"
            />
            <p className={styles.paraTitle}>Deocamdată nu sunt conversații în curs</p>
            <p>
              Când un cumpărător începe o conversație cu tine, ea apare <br />
              Dacă ai ceva de vândut sau un serviciu de oferit, începe publicând
              un anunț.
            </p>
          </div>
        </div>

        <div className={styles.chatMessageContainer}>
          <div className={styles.photoParaContainer}>
            <img
              className={styles.iconChat}
              src="/foto-icons/icon-mesagerie.jpg"
              alt="Selectează o conversație"
            />
            <p>Selectează o conversație pentru a o citi</p>
          </div>
        </div>
      </div>
      <hr />

      <div className={styles.footerChatPage}>
        <p>
          Aplicații mobile <br /> Ajutor și contact <br /> Anunțuri promovate <br />
          BARD marketplace <br /> Citește blog-ul BARD.ro <br /> Condiții de utilizare <br />
          Politica de confidențialitate <br /> Prețuri de publicitate <br /> Liste de prețuri <br />
          ANPC <br /> Academia de Business <br /> Livrare prin BARD <br /> Informații Ordin 225/2023 <br />
        </p>
        <p>
          Recompense Vânzător <br /> Cum să te ferești de phishing <br /> Harta site <br />
          Harta județelor <br /> Harta mini-site-urilor <br /> Căutări frecvente <br />
          Cariere în BARD.app <br /> Cum funcționează? <br /> How to BARD <br />
          Bun de angajat <br /> Politica privind cookie-urile <br /> Setări Cookies
        </p>
        <img src="/foto-icons/google-&-appStore-icons.jpg" alt="App Store și Google Play" />
      </div>
    </div>
  );
};

export default Chat;

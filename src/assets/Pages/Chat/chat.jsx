import Header from '../../Components/Header/header';
import { FaTrash, FaBookmark } from 'react-icons/fa';
import styles from './chat.module.css';
import NavBar from '../../Components/NavBar/navBar';
import Footer from '../../Components/Footer/footer';

const Chat = () => {
  return (
    <>
      <Header />
      <NavBar />
      <div className={styles.chatPageContainer}>
       
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
                src="/foto-icons/icon-mesagerie.jpg" // Evită folosirea "public/"
                alt="Mesagerie"
              />
              <p className={styles.paraTitle}>
                Deocamdată nu sunt conversații în curs
              </p>
              <p>
                Când un cumpărător începe o conversație cu tine, ea apare <br />
                Dacă ai ceva de vândut sau un serviciu de oferit, începe
                publicând un anunț.
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
            </div>
          </div>
        </div>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Chat;

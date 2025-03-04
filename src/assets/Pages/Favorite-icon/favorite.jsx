import Header from '../../Components/Header/header';
import styles from './favorite.module.css';

const Favorite = () => {
  return (
    <>
      <Header />
      
      <div className={styles.h1Container}>
        <h1>Căutările tale favorite</h1>
      </div>
      <div className={styles.paraContainer}>
        <p>Anunțuri favorite</p>
        <p>Căutări salvate</p>
        <p>Văzute recent</p>
      </div>
      <div className={styles.filteredAdsContainer}>
        <img className={styles.filteredAdsContainerIcon} src="/foto-icons/magnifying-glass.png" alt="" />
        <p className={styles.filteredAdsContainerParaTitle}>
          Cauți ceva anume? Salvează filtrele folosite.
        </p>
        <p className={styles.filteredAddsContainerPara}>
          Aici vor apărea toate anunțurile noi care respectă criteriile tale.
        </p>
      </div>
      <hr />
      <div className={styles.footerChatPage}>
        <p>
          Aplicații mobile <br /> Ajutor și contact <br /> Anunțuri promovate <br /> BARD marketplace <br />
          Citește blog-ul BARD.ro <br /> Condiții de utilizare <br /> Politica de confidențialitate <br />
          Prețuri de publicitate <br /> Liste de prețuri <br /> ANPC <br /> Academia de Business <br />
          Livrare prin BARD <br /> Informații Ordin 225/2023 <br />
        </p>
        <p>
          Recompense Vânzător <br /> Cum să te ferești de phishing <br /> Harta site <br /> Harta județelor <br />
          Harta mini-site-urilor <br /> Căutări frecvente <br /> Cariere în BARD.app <br /> Cum funcționează? <br />
          How to BARD <br /> Bun de angajat <br /> Politica privind cookie-urile <br /> Setări Cookies
        </p>
        <img src="/foto-icons/google-&-appStore-icons.jpg" alt="" />
      </div>
    </>
  );
};

export default Favorite;

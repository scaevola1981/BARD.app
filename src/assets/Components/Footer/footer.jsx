import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerHead}>
        <img
          className={styles.footerLogo}
          src="./foto-icons/stock-logo.jpg"
          alt="Logo BARD"
        />
        <p>Descoperă oferta EXVERO.App pentru schimbul tău dorit!</p>
        <button className={styles.detailsButton}>Vezi mai multe detalii</button>
      </div>

      <div className={styles.mainContent}>
       
        <p>
        EXVERO - Platforma de schimb simplu și eficient. EXVERO este o aplicație
          inovatoare, dedicată schimburilor de bunuri și alimente între
          utilizatori, oferind o alternativă la cumpărături tradiționale.
          Concepută pentru a simplifica interacțiunea între persoanele care
          doresc să facă schimburi echitabile, platforma oferă o experiență
          simplă, prietenoasă și eficientă.
        </p>
      </div>

      <div className={styles.socialIcons}>
        <img src="./foto-icons/logo-icon2.jpg" alt="Instagram" />
        <img src="./foto-icons/facebook-icon.jpg" alt="Facebook" />
        <img src="./foto-icons/ytb-icon.jpg" alt="YouTube" />
      </div>

      <div className={styles.footerInfo}>
        <p>
          Aplicatii mobile <br />
          Ajutor și contact <br />
          Anunțuri promovate <br />
          EXVERO marketplace <br />
          Blog EXVERO.ro <br />
          Condiții de utilizare <br />
          Politica de confidențialitate <br />
          Preturi de publicitate <br />
          ANPC <br />
          Livrare prin EXVERO <br />
          Informatii Ordin 225/2023
        </p>
        <p>
          Cum să te ferești de phishing <br />
          Harta site <br />
          Cariere in EXVERO.app <br />
          Politica privind cookie-urile <br />
          Setări Cookies <br />
          Harta mini-site-urilor <br />
          Căutări frecvente <br />
          Cariere in EXVERO <br />
          Angajatori de pe EXVERO <br />
          Cum functioneaza? <br />
          How to EXVERO
        </p>
        <img
          className={styles.storeIcons}
          src="./foto-icons/google & appStore icons.jpg"
          alt="Google & App Store"
        />

        <div className={styles.flagContainer}>
          <p>
            🇧🇬 EXVERO.bg 🇵🇱 EXVERO.pl 🇺🇦 EXVERO.ua 🇵🇹 EXVERO.pt 🇷🇴Autovit.ro 🇷🇴Storia.ro
            🇷🇴EXVERO Business
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

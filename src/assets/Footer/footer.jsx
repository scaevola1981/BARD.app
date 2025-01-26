import './footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-head">
        <img className="footer-logo" src="../public//stock-logo.jpg" alt="" />
        <p>Descoperă oferta BARD.App pentru schimbul tau dorit !</p>
        <button>Vezi mai multe detalii</button>
      </div>
      <div className="main-content">
        <img src="../public/foto-icons/logo.jpg" alt="" />
        <p>
          BARD - Platforma de schimb simplu și eficient BARD este o aplicație
          inovatoare, dedicată schimburilor de bunuri și alimente între
          utilizatori, oferind o alternativă la cumpărături tradiționale.
          Concepută pentru a simplifica interacțiunea între persoanele care
          doresc să facă schimburi echitabile, platforma oferă o experiență
          simplă, prietenoasă și eficientă. Aplicația permite utilizatorilor să
          creeze anunțuri pentru bunurile pe care doresc să le ofere, precum și
          să adauge informații despre obiectele sau alimentele dorite în schimb.
          Fiecare utilizator are posibilitatea de a explora categorii bine
          organizate, de la alimente și electrocasnice până la cărți și alte
          obiecte utile. În loc să fie orientată spre tranzacții financiare,
          aplicația încurajează partajarea resurselor și colaborarea între
          membri, promovând un stil de viață sustenabil. BARD se angajează să
          creeze o comunitate bazată pe încredere, oferind funcționalități care
          facilitează comunicarea între utilizatori și un sistem simplu pentru
          gestionarea anunțurilor. Începe să schimbi, nu să cumperi, cu BARD!
        </p>
        <div className="para-container">
          <p>Fii alaturi de noi si pe retelele sociale:</p>
        </div>
        <div className="social-icons">
        <img src="./public/insta-icon.jpg" alt="" />
        <img src="./public/facebook-icon.jpg" alt="" />
        <img src="./public/ytb-icon.jpg" alt="" />
      </div>
      </div>

     
      <div className="footer-info"></div>
    </footer>
  );
};

export default Footer;

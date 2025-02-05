import Header from '../../Components/Header/header';
import './vazute-recent-page.css';

const VazuteRecent = () => {
  return (
    <>
      <Header />
      <div className="h1-vazute-recent-container">
        <h1>Vazute recent</h1>
      </div>
      <div className="buttons-vazute-recent-container">
        <button className="anunturi-favorite">Anunturi favorite</button>
        <button className="cautari-salvate">Cautari salvate</button>
        <button className="vazute-recent">Vazute recent</button>
      </div>
      <div className="filtered-anunturi-container">
        <img src="public/foto-icons/logo-vazute-recent.png" alt="" />
        <p className="para-anunturi-titlu">
          Anunturile tale vizionate vor aparea aici
        </p>
        <p className="para-anunturi">
          Anunțurile care îți plac și îți vor apărea toate aici.
        </p>
      </div>
      <hr />
      <div className="footer-chat-page">
        <p>
          Aplicatii mobilebr <br /> Ajutor si contact <br /> Anunturi promovate{' '}
          <br /> BARD marketplace <br />
          Citeste blog-ul BARD.ro <br />
          Conditii de utilizare <br /> Politica de confidentialitate <br />
          Preturi de publicitate <br /> Liste de preturi <br /> ANPC <br />
          Academia de Business <br /> Livrare prin BARD <br /> Informatii Ordin
          225/2023 <br />
        </p>
        <p>
          Recompense Vânzãtor <br /> Cum să te ferești de phishing <br /> Harta
          site <br /> Harta judetelor <br /> Harta mini-site-urilor <br />{' '}
          Căutări frecvente <br /> Cariere in BARD.app <br /> Cum functioneaza?{' '}
          <br /> How to BARD <br /> Bun de angajat <br /> Politica privind
          cookie-urile <br />
          Setări Cookies
        </p>
        <img src="./foto-icons/google & appStore icons.jpg" alt="" />
      </div>
    </>
  );
};

export default VazuteRecent;

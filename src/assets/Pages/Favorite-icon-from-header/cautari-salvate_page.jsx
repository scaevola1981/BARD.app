import Header from '../../Components/Header/header';
import './cautari-salvate_page.css';
import {Link} from 'react-router-dom';



const Favorite = () => {
  return (
    <>
      <Header />
      
        <div className="h1-container">
          <h1>Cautarile tale favorite</h1>
        </div>
        <div className='para-container'>
          <Link to='anunturi-favorite ' className='anunturi-favorite'>
          <button className='anunturi-favorite'>Anunturi favorite</button>
          </Link>
          
          <button className='cautari-salvate'>Cautari salvate</button>
          <button className='vazute-recent'>Vazute recent</button>
        </div>
        <div className="filtered-ads-container">
          <img className="filtered-ads-container-icon" src="./foto-icons/magnifying-glass.png" alt="" />
          <p className="filtered-ads-container-para-title">
            Cauți ceva anume? Salvează filtrele folosite.
          </p>
          <p className="filtred-adds-container-para">
            Aici vor apărea toate anunțurile noi care respectă criteriile tale.
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

export default Favorite;

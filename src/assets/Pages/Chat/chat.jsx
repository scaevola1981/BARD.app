import Header from '../../Components/Header/header';
import { FaTrash, FaBookmark, FaTruck } from 'react-icons/fa';
import './chat.css';


const Chat = () => {
  return (
    <div className="chat-page-container">
      <Header />

      <div className="navBar-chat-container">
        
        <p>De lucrat pe viitor (adaugare continut) !!</p>
        <nav className="navBar-chat">
          <button className="myAds-btn">Anunturile mele</button>
          <button className="chat-btn">Chat</button>
          <button className="exchanges-btn">Schimburi</button>
          <button className="ratings-btn">Ratinguri</button>
          <button className="delivery-btn">
            <FaTruck className="truck-icon-btn" />
            Curier
          </button>
          <button className="clientProfile-btn">Profil client</button>
          <button className="chatSetings-btn">Setari</button>
        </nav>
      </div>

      <div className="chat-container">
        <div className="favoritIcon-trashIcon-container">
          <button className="favorites-btn">
            <FaBookmark className="favorites-icon" />
            <span>Favorite</span>
          </button>
          <button className="recycleBin-btn">
            <FaTrash className="recycleBin-icon" />
            <span>Mesaje sterse</span>
          </button>
          <div className="customerList-container">
            <button className="change-btn">Schimbat</button>
            <button className="forChange-btn">De schimbat</button>
            <img
              className="icon-list-chat"
              src="public/foto-icons/icon-mesagerie.jpg"
              alt=""
            />
            <p className='para-title'>Deocamdată nu sunt conversații în curs</p>
            <p> 
            Când un cumpărător începe o conversație cu tine, ea apare <br />
            Dacă ai ceva de vândut sau un serviciu de oferit, începe publicând
            un anunț
            </p>
         
          </div>
        </div>

        <div className="chatMessage-container">
          <div className="photo-para-container">
            <img
              className="icon-chat"
              src="public/foto-icons/icon-mesagerie.jpg"
              alt=""
            />
            <p>Selectează o conversație pentru a o citi</p>
          </div>
        </div>
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
    </div>
  );
};

export default Chat;

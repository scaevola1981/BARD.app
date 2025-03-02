import './search-page.css';
import cardData from '../../Components/Card/cardData';
import Card from '../../Components/Card/card';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/header';
import NavBar from '../../Components/NavBar/navBar';
import Footer from '../../Components/Footer/footer';




const SearchPage = () => {
  const [carduriFiltrate, setCarduriFiltrate] = useState([]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get('searchTerm') || '';
  const city = queryParams.get('city') || '';



  

  useEffect(() => {
    if (!Array.isArray(cardData) || cardData.length === 0) {
      console.error('❌ `cardData` nu conține date valide!');
      return;
    }

    const filtrate = cardData.filter((card) => {
      if (!card || typeof card.title !== 'string') return false;

      const titlu = card.title.toLowerCase();
      const judet = card.judet?.toLowerCase() || '';
      const comune = card.comune?.map((c) => c.toLowerCase()) || [];
      const eventDesc = card.eventDescription?.toLowerCase() || '';
      const categorii = card.categories?.map((c) => c.toLowerCase()) || [];
      const orase = card.cities?.map((c) => c.toLowerCase()) || [];

      const potrivireTermeni =
        searchTerm === '' ||
        titlu.includes(searchTerm.toLowerCase()) ||
        judet.includes(searchTerm.toLowerCase()) ||
        comune.some((c) => c.includes(searchTerm.toLowerCase())) ||
        eventDesc.includes(searchTerm.toLowerCase()) ||
        categorii.some((c) => c.includes(searchTerm.toLowerCase()));

      const potrivireOras =
        city === '' || orase.some((c) => c.includes(city.toLowerCase()));

      return potrivireTermeni && potrivireOras;
    });

    setCarduriFiltrate(filtrate);
  }, [searchTerm, city]);

  return (
    <>
      <div className="search-page">
        <Header />
        <NavBar />
        <div className="search-title">
          <h2>Rezultatele căutării</h2>
        </div>
        <div className="search-filters">
           
       
        </div>
        <div className="search-card">
          {carduriFiltrate.length > 0 ? (
            <Card cardData={carduriFiltrate} />
          ) : (
            <p>🤔 Nu s-au găsit rezultate pentru căutarea ta!</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;


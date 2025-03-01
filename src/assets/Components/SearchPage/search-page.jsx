import './search-page.css';
import cardData from '../Card/cardData';
import Card from '../Card/card';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/header';
import NavBar from '../NavBar/navBar';
import Footer from '../Footer/footer';

import Autocompletare from '../Autocompletare/autocompletare-orase';
import AutocompletareCategorii from '../Autocompletare/autocompletare-categorii';

const SearchPage = () => {
  const [carduriFiltrate, setCarduriFiltrate] = useState([]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get('searchTerm') || '';
  const city = queryParams.get('city') || '';

  //  Funcție pentru selectarea orașului
  const handleCitySelect = (selectedCity) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('city', selectedCity);
    window.history.pushState(null, '', `?${queryParams.toString()}`);
  };

  //  Funcție pentru selectarea categoriei
  const handleSearchTermSelect = (selectedTerm) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('searchTerm', selectedTerm);
    window.history.pushState(null, '', `?${queryParams.toString()}`);
  };

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
          <Autocompletare onSelect={handleCitySelect} />
          <AutocompletareCategorii onSelect={handleSearchTermSelect} />
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


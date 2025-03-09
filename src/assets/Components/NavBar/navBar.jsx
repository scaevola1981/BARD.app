import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocompletare from '../Autocompletare/autocompletare-orase';
import AutocompletareCategorii from '../Autocompletare/autocompletare-categorii';

import styles from './navBar.module.css';


const NavBar = () => {
  const [termeniCautare, setTermeniCautare] = useState('');
  const [judet, setJudet] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (termeniCautare || judet) {
      navigate(
        `/search-page?searchTerm=${encodeURIComponent(
          termeniCautare
        )}&city=${encodeURIComponent(judet)}`
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  //  Funcție pentru selectarea categoriei
  const handleSearchTermSelect = (selectedTerm) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('searchTerm', selectedTerm);
    window.history.pushState(null, '', `?${queryParams.toString()}`);
  };

  //  Funcție pentru selectarea orașului
  const handleCitySelect = (selectedCity) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('city', selectedCity);
    window.history.pushState(null, '', `?${queryParams.toString()}`);
    setJudet(selectedCity);
  };

  const goToAddPostForm = () => {
    navigate('/addPostForm');
  }

  return (
    <>
     <button className={styles.addPostBtn} onClick={goToAddPostForm}>
          Adaugă Anunț
        </button>
      <nav className={styles.navbar}>
        <div className={styles.inputGroup}>
          <Autocompletare
            onSelect={handleCitySelect}
            onChange={(e) => setJudet(e.target.value)}
            value={judet}
            onKeyDown={handleKeyDown}
          />
          <AutocompletareCategorii
            onSelect={handleSearchTermSelect}
            onChange={(e) => setTermeniCautare(e.target.value)}
            onKeyDown={handleKeyDown}
            value={termeniCautare}
            placeholder="Ce cauți?"
          />
          <button className={styles.searchBtn} onClick={handleSearch}>
            Caută
            <span className={styles.searchIcon}>🔍</span>
          </button>
        </div>
       
      </nav>
    </>
  );
};

export default NavBar;

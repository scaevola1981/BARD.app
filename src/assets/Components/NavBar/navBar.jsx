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

  const handleSearchTermSelect = (selectedTerm) => {
    setTermeniCautare(selectedTerm);
  };

  const handleCitySelect = (selectedCity) => {
    setJudet(selectedCity);
  };

  return (
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
  );
};

export default NavBar;
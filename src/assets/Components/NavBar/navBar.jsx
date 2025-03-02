
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Autocompletare from '../../Pages/Autocompletare/autocompletare-orase'
import AutocompletareCategorii from '../../Pages/Autocompletare/autocompletare-categorii';

import './NavBar.css';

const NavBar = () => {

  const [termeniCautare, setTermeniCautare] = useState('');
  const [judet, setJudet]= useState('') ;
  const navigate = useNavigate();

  const handleSearch = () => {
    if (termeniCautare || judet ) [
      navigate(`/search-page?searchTerm=${encodeURIComponent(termeniCautare)}&city=${encodeURIComponent(judet)}`)
    ]
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

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

  // const handleSelectCity = (city) => {
  //   setJudet(city)
  // };

  return (
    <div className="navbar-container ">
      <nav className="navbar">
        <div className="input-group">
          {/* <input type="text" 
                 className="input-text"  
                 placeholder="Ce cauți?" 
                 value={termeniCautare}
                 onChange={(e) => setTermeniCautare(e.target.value)}
                 onKeyDown={handleKeyDown}
          /> */}
         {/* Vechiul input nu sterge poate va mai trebuii vreodata */}
          {/* <input type="text"  
                 className="input-city"
                 placeholder="Toata Romania" 
                value={judet}
                onChange={(e) => setJudet(e.target.value)}
                onKeyDown={handleKeyDown}
          /> */}
          <Autocompletare onSelect={handleCitySelect}   
                          onChange={(e) => setJudet(e.target.value)}
                          value={judet}
                          onKeyDown={handleKeyDown}
            />
          <AutocompletareCategorii onSelect={handleSearchTermSelect} 
                                   onChange={(e) => setTermeniCautare(e.target.value)} 
                                   onKeyDown={handleKeyDown}
                                   value={termeniCautare}
                                   placeholder="Ce cauți?" 
          />
          <button className="search-btn" onClick={handleSearch}>
            Caută
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

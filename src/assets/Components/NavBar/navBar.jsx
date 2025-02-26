
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="navbar-container ">
      <nav className="navbar">
        <div className="input-group">
          <input type="text" 
                 className="input-text"  
                 placeholder="Ce cauți?" 
                 value={termeniCautare}
                 onChange={(e) => setTermeniCautare(e.target.value)}
          />

          <input type="text"  
                 className="input-city"
                 placeholder="Toata Romania" 
                value={judet}
                onChange={(e) => setJudet(e.target.value)}
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

import { useState } from 'react';

import './NavBar.css';


const NavBar = ({ judete }) => {
  const [selectedJudet, setSelectedJudet] = useState('');
  const [selectedOrase, setSelectedOrase] = useState([]);
  const [selectedComune, setSelectedComune] = useState([]);

  const handleJudetChange = (e) => {
    // Functie care gestionează schimbarea județului selectat
    const judetName = e.target.value;
    setSelectedJudet(judetName);

    // Găsim județul selectat din lista de județe
    const judet = judete.find((judet) => judet.judet === judetName);


    // Setam orasele si comunele pentru judetul selectat
    if (judet) {
      setSelectedOrase(judet.cities);
      setSelectedComune(judet.comune);
    } else {
      setSelectedOrase([]);
      setSelectedComune([]);
    }
  };

  const handleSearch = () => {
    console.log('Căutare pentru', selectedJudet, selectedOrase, selectedComune);
  }  

  return (
    <div className="navbar-container ">
      <nav className="navbar">
        <div className="input-group">
          <input type="text" className="input-text" placeholder="Ce cauți?" />
          <select
            className="input-judet"
            value={selectedJudet}
            onChange={handleJudetChange}
          >
            <option value="">Toata tara</option>
            {judete.map((judet, index) => (
              <option value={judet.judet} key={index}>
                {judet.judet}
              </option>
            ))}
          </select>
          {selectedJudet && (
            <select className="input-orase">
              <option value="">Alege orasul</option>
              {selectedOrase.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
            </select>
          )}
          {selectedJudet && (
            <select className="input-comune">
              <option value="">Alege comuna</option>
              {selectedComune.map((comune, index) => (
                <option value={comune} key={index}>
                  {comune}
                </option>
              ))}
            </select>
          )}

        
          <button  className="search-btn" onClick={handleSearch}>
            Caută
            <span className="search-icon">🔍</span>

          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

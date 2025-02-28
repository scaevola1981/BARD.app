import { useState } from 'react';
import './autocompletare.css'

const orase = [
    "Alba Iulia", "Arad", "Bacau", "Bistrita", "Botosani", "Brasov", 
  "Braila", "Bucuresti", "Buzau", "Cluj-Napoca", "Calarasi", 
  "Constanta", "Craiova", "Falticeni", "Fagaras", "Giurgiu", 
  "Galati", "Iasi", "Timisoara", "Sibiu", "Ploiesti", "Satu Mare",
  "Slatina", "Oradea", "Targu Mures", "Pitesti", "Ramnicu Valcea", 
  "Targoviste", "Deva", "Slobozia", "Bacau", "Drobeta-Turnu Severin"
];

const Autocompletare = ({onSelect}) => {
  const [cautareTermeni, setCautareTermeni] = useState('');
  const [filtrareOrase, setFiltrareOrase] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCautareTermeni(value);

    if (value.length > 0) {
      const filtered = orase.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFiltrareOrase(filtered);
    } else {
      setFiltrareOrase([]);
    }
  };

  const handleSelectCity = (city) => {
    setCautareTermeni(city);
    setFiltrareOrase([]);
    onSelect(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filtrareOrase.length > 0) {
      handleSelectCity(filtrareOrase[0]);
    }
  }

  return (
    <div className="autocompletare-container">
      <input
        type="text"
        placeholder="Cauta oras.."
        value={cautareTermeni}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="autocompletare-input"
      />

      {filtrareOrase.length > 0 && (
        <ul className="autocompletare-dropdown">
          {filtrareOrase.map((city, index) => (
            <li key={index} onClick={() => handleSelectCity(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocompletare;

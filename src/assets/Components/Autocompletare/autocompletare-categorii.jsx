import { useState } from "react";
import styles from './autocompletare-categorii.module.css';
import categoriesData from '../Categories/categoriesData';


// Funcția pentru eliminarea diacriticelor
const removeDiacritics = (text) => {
  const diacriticsMap = {
    'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
    'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
  };
  return text.split('').map(char => diacriticsMap[char] || char).join('');
};




const AutocompletareCategorii = ({ onSelect }) => {
  const [cautareTermeni, setCautareTermeni] = useState('');
  const [filtrareCategorii, setFiltrareCategorii] = useState([]);

  // Flatten the categories to extract all subcategories in a single array
  const toateSubcategoriile = categoriesData.flatMap((cat) => cat.subcategories);

  // Filtrarea subcategoriilor pe baza inputului
  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setCautareTermeni(value);

    if (value.length > 0) {
      // Filtrăm subcategoriile, eliminând diacriticele și comparându-le
      const filtered = toateSubcategoriile.filter((subcat) =>
        removeDiacritics(subcat.toLowerCase()).includes(removeDiacritics(value.toLowerCase()))
      );
      setFiltrareCategorii(filtered);
    } else {
      setFiltrareCategorii([]);
    }
  };

  // Selectarea unei subcategorii
  const handleSelectCategory = (category) => {
    setCautareTermeni(category);
    setFiltrareCategorii([]);
    onSelect(category);
  };

  // Selectarea unei subcategorii la apăsarea tastei "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filtrareCategorii.length > 0) {
      handleSelectCategory(filtrareCategorii[0]);
    }
  };

  return (
    <div className={styles.autocompletareContainer}>
      <input
        type="text"
        placeholder="Ce cauți?"
        value={cautareTermeni}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.autocompletareInput}
      />

      {filtrareCategorii.length > 0 && (
        <ul className={styles.autocompletareDropdown}>
          {filtrareCategorii.map((subcat, index) => (
            <li key={index} onClick={() => handleSelectCategory(subcat)} className={styles.dropdownItem}>
              {subcat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompletareCategorii;


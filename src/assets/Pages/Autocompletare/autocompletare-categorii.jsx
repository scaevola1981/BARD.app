import { useState } from "react";
import './autocompletare-categorii.css';

import categoriesData from '../../Components/Categories/categoriesData';

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

   const toateSubcategoriile = categoriesData.flatMap((cat) => cat.subcategories);

   console.log(categoriesData);
   console.log(toateSubcategoriile);

   const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setCautareTermeni(value);

    console.log('Căutare: ', value);

    if (value.length > 0) {
        // Filtrăm subcategoriile, eliminând diacriticele și comparându-le
        const filtered = toateSubcategoriile.filter((subcat) =>
            removeDiacritics(subcat.toLowerCase()).includes(removeDiacritics(value.toLowerCase()))
        );

        console.log('Categorii filtrate: ', filtered);
        setFiltrareCategorii(filtered);
    } else {
        setFiltrareCategorii([]);
    }
   };

   const handleSelectCategory = (category) => {
    setCautareTermeni(category);
    setFiltrareCategorii([]);
    onSelect(category);
   };

   const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filtrareCategorii.length > 0) {
        handleSelectCategory(filtrareCategorii[0]);
    }
   };

    return(
        <>
       <div className="autocompletare-caontainer">
       <input
        type="text"
        placeholder="Ce cauți?"
        value={cautareTermeni}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="autocompletare-input"
      />

        {filtrareCategorii.length > 0 && (
        <ul className="autocompletare-dropdown">
          {filtrareCategorii.map((subcat, index) => (
            <li key={index} onClick={() => handleSelectCategory(subcat)}>
              {subcat}
            </li>
          ))}
        </ul>
      )}
         </div>
        </>
    );
}

export default AutocompletareCategorii;

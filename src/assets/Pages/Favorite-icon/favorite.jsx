import Header from '../../Components/Header/header';
import styles from './favorite.module.css';
import Footer from '../../Components/Footer/footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../Components/Card/card';
import { useTheme } from '../../../api/themeContext'; // Importă ThemeContext

const Favorite = () => {
  const navigate = useNavigate();
  const [favoritesAds, setFavoritesAds] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const { theme } = useTheme(); // Folosește ThemeContext

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritesAds(storedFavorites);
  }, []);

  const handleRemoveFavorite = (idToRemove) => {
    const updatedFavorites = favoritesAds.filter(
      (card) => String(card.id) !== String(idToRemove)
      // (card) => card.id !== idToRemove
    );
    setFavoritesAds(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    console.log("ID primit pentru ștergere:", idToRemove); // Debug
    console.log("Lista actualizată de favorite:", updatedFavorites); // Debug
  };

  const handleCardClick = (id) => {
    navigate(`/ad-detail/${id}`);
  };

  return (
    <div className={`${theme === 'dark' ? styles.darkTheme : ''}`}>
      <Header />
      
      <div className={`${styles.containerFavorites} ${theme === 'dark' ? styles.darkTheme : ''}`}>
        <div className={styles.h1Container}>
          <h1>Căutările tale favorite</h1>
        </div>
        {favoritesAds.length === 0 ? (
          <div className={styles.paraContainer}>
            <p>Anunțuri favorite</p>
            <p>Nu ai adăugat încă niciun anunț.</p>
          </div>
        ) : (
          <Card
            ads={favoritesAds}
            isFavoriteView={true}
            onRemove={handleRemoveFavorite}
            onCardClick={handleCardClick}
          />
        )}
      </div>

      {showMessage && (
        <div className={`${styles.toast} ${theme === 'dark' ? styles.darkToast : ''}`}>
          ✅ Anunțul a fost șters din favorite!
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Favorite;

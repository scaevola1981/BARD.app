import Header from '../../Components/Header/header';
import styles from './favorite.module.css';
import Footer from '../../Components/Footer/footer';
import NavBar from '../../Components/NavBar/navBar';
import { useEffect, useState } from 'react';
import Card from '../../Components/Card/card';

const Favorite = () => {
  const [favoritesAds, setFavoritesAds] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritesAds(storedFavorites);
  }, []);

  const handleRemoveFavorite = (idToRemove) => {
    const updatedFavorites = favoritesAds.filter(
      (card) => card.id !== idToRemove
    );
    setFavoritesAds(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <>
      <Header />
      <NavBar />
      <div className={styles.containerFavorites}>
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
          />
        )}
      </div>

      {showMessage && (
        <div className={styles.toast}>
          ✅ Anunțul a fost șters din favorite!
        </div>
      )}

      <Footer />
    </>
  );
};

export default Favorite;

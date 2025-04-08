import Header from '../../Components/Header/header';
import styles from './favorite.module.css';
import Footer from '../../Components/Footer/footer';
import NavBar from '../../Components/NavBar/navBar';
import { useEffect, useState } from 'react';

const Favorite = () => {

  const [favoritesAds, setFavoritesAds] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritesAds(storedFavorites);
  }, []);

  const handleRemoveFavorite = (idToRemove) => {
    const updatedFavorites = favoritesAds.filter(card => card.id !== idToRemove);
    setFavoritesAds(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
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
          <div className={styles.cardsGrid}>
            {favoritesAds.map(card => (
              <div key={card.id} className={styles.card}>
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.judet}</p>
                <p>{card.cities}</p>
                <p>{card.comune}</p>
                <p>{card.eventDescription}</p>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveFavorite(card.id)}
                >
                  Șterge din favorite
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔔 AICI punem mesajul animat */}
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


import Header from '../../Components/Header/header';
import styles from './favorite.module.css';
import Footer from '../../Components/Footer/footer';
import Modal from '../../Components/Modal/Modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../Components/Card/card';
import { useTheme } from '../../../api/themeContext';
import { getFavorites, removeFavorite } from '../../../api/favoritesManager';

const Favorite = () => {
  const navigate = useNavigate();
  const [favoritesAds, setFavoritesAds] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });
  const { theme } = useTheme();

  useEffect(() => {
    setFavoritesAds(getFavorites());

    const handleStorageChange = () => {
      setFavoritesAds(getFavorites());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleRemoveFavorite = (idToRemove) => {
    const updated = removeFavorite(idToRemove);
    setFavoritesAds(updated);
    setModalConfig({
      isOpen: true,
      title: 'Eliminat din Favorite',
      message: 'Anunțul a fost șters din lista ta de favorite.',
      type: 'info',
    });
  };

  const handleCardClick = (id) => {
    navigate(`/ad/${id}`);
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
            <p>Nu ai adăugat încă niciun anunț la favorite.</p>
          </div>
        ) : (
          <Card
            ads={favoritesAds}
            isFavoriteView={true}
            onRemove={handleRemoveFavorite}
            onCardClick={handleCardClick}
            hideTitle={true}
          />
        )}
      </div>

      <Footer />

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
    </div>
  );
};

export default Favorite;

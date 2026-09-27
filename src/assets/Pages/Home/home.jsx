import Header from '../../Components/Header/header';
import Navbar from '../../Components/NavBar/navBar';
import Categories from '../../Components/Categories/categories';
import Card from '../../Components/Card/card';
import Footer from '../../Components/Footer/footer';
import Modal from '../../Components/Modal/Modal';
import categoriesData from '../../Components/Categories/categoriesData';
import adEntity from '../../../api/adEntity';
import { getFavorites, addFavorite, removeFavorite } from '../../../api/favoritesManager';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [latestAds, setLatestAds] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    if (id) {
      navigate(`/ad/${id}`);
    } else {
      navigate('/ads');
    }
  };

  useEffect(() => {
    // Sincronizare inițială favorite
    setFavoritesList(getFavorites());

    const handleStorageChange = () => {
      setFavoritesList(getFavorites());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setIsLoading(true);
        const { data, success } = await adEntity.readAllSorted();

        if (success && Array.isArray(data)) {
          setLatestAds(data.slice(0, 8));
        } else if (success && data && typeof data === 'object') {
          const adaptedAds = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setLatestAds(adaptedAds.slice(0, 8));
        } else {
          setError('Nu s-au putut încărca anunțurile');
        }
      } catch (err) {
        console.error('Eroare la preluarea anunțurilor:', err);
        setError(`Eroare: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleAddFavorite = (ad) => {
    const isAlready = favoritesList.some((fav) => String(fav.id) === String(ad.id));
    if (isAlready) {
      setModalConfig({
        isOpen: true,
        title: 'Anunț deja salvat',
        message: 'Acest anunț este deja în lista ta de favorite!',
        type: 'info',
      });
      return;
    }

    const updated = addFavorite(ad);
    setFavoritesList(updated);
    setModalConfig({
      isOpen: true,
      title: 'Adăugat la Favorite! ❤️',
      message: `Anunțul „${ad.title}” a fost adăugat cu succes în lista ta de favorite.`,
      type: 'favorite',
    });
  };

  const handleRemoveFavorite = (adId) => {
    const updated = removeFavorite(adId);
    setFavoritesList(updated);
    setModalConfig({
      isOpen: true,
      title: 'Eliminat din Favorite',
      message: 'Anunțul a fost eliminat din lista ta de favorite.',
      type: 'info',
    });
  };

  const checkIsFavorite = (adId) => {
    return favoritesList.some((fav) => String(fav.id) === String(adId));
  };

  return (
    <div className={styles.homeContainer}>
      <Header />
      <Navbar />
      <Categories categories={categoriesData} />

      <main className={styles.mainContent}>
        <section className={styles.adsSection}>
          {error && <p className={styles.errorMessage}>{error}</p>}

          <Card
            ads={latestAds}
            onCardClick={handleCardClick}
            isLoading={isLoading}
            error={error}
            onAddFavorite={handleAddFavorite}
            onRemove={handleRemoveFavorite}
            isFavorite={checkIsFavorite}
            isFavoriteView={false}
          />

          {!isLoading && latestAds.length === 0 && (
            <p className={styles.noResults}>
              Nu există anunțuri disponibile momentan.
            </p>
          )}
        </section>
      </main>

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

export default Home;

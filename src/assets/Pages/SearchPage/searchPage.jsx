import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import adEntity from '../../../api/adEntity'; 
import Card from '../../Components/Card/card'; 
import Header from '../../Components/Header/header';
import Modal from '../../Components/Modal/Modal';
import { getFavorites, addFavorite, removeFavorite } from '../../../api/favoritesManager';
import styles from './searchPage.module.css'; 

const SearchPage = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('searchTerm') || '';
  const city = queryParams.get('city') || '';

  useEffect(() => {
    setFavoritesList(getFavorites());

    const handleStorageChange = () => {
      setFavoritesList(getFavorites());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      try {
        const { data, success } = await adEntity.readAll();
        if (success) {
          setAds(data);
        } else {
          setError('Nu s-au putut prelua anunțurile.');
        }
      } catch (err) {
        console.error('Eroare la aducerea anunțurilor:', err);
        setError('A apărut o eroare la preluarea anunțurilor.');
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
      message: `Anunțul „${ad.title}” a fost adăugat în favorite.`,
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

  const filteredAds = ads.filter((ad) => {
    const matchCategory = searchTerm ? ad.categories === searchTerm : true;
    const matchCity = city ? ad.city.toLowerCase() === city.toLowerCase() : true;
    return matchCategory && matchCity;
  });

  return (
    <>
      <Header />
      <div className={styles.searchPage}>
        <div className={styles.pageHeader}>
          <h1>Rezultatele Căutării</h1>
          {(searchTerm || city) && (
            <h2>
              {searchTerm && <span className={styles.filterBadge}>{searchTerm}</span>}
              {searchTerm && city && <span className={styles.separator}>|</span>}
              {city && <span className={styles.filterBadge}>{city}</span>}
            </h2>
          )}
        </div>

        {isLoading && (
          <div className={styles.loading}>Se încarcă anunțurile...</div>
        )}
        {error && (
          <div className={styles.error}>{error}</div>
        )}
        {!isLoading && filteredAds.length === 0 ? (
          <div className={styles.noResults}>
            Nu s-au găsit anunțuri pentru criteriile selectate.
          </div>
        ) : (
          <Card
            ads={filteredAds}
            isLoading={isLoading}
            error={error}
            onAddFavorite={handleAddFavorite}
            onRemove={handleRemoveFavorite}
            isFavorite={checkIsFavorite}
            isFavoriteView={false}
            onCardClick={(id) => navigate(`/ad/${id}`)}
            hideTitle={true}
          />
        )}
      </div>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
    </>
  );
};

export default SearchPage;

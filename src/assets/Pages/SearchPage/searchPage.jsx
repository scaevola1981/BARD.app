import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import adEntity from '../../../api/adEntity'; 
import Card from '../../Components/Card/card'; 
import Header from '../../Components/Header/header';
import styles from './searchPage.module.css'; 

const SearchPage = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteAds, setFavoriteAds] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('searchTerm') || '';
  const city = queryParams.get('city') || '';

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
    setFavoriteAds((prevFavorites) => [...prevFavorites, ad]);
  };

  const handleRemoveFavorite = (adId) => {
    setFavoriteAds((prevFavorites) =>
      prevFavorites.filter((ad) => ad.id !== adId)
    );
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
            isFavoriteView={false}
            favoriteAds={favoriteAds}
          />
        )}
      </div>
    </>
  );
};

export default SearchPage;

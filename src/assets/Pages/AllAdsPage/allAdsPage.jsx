import { useEffect, useState } from 'react';
import adEntity from '../../../api/adEntity';
import Card from '../../Components/Card/card';
import { useSearchParams } from 'react-router-dom';
import styles from './allAdsPage.module.css';
import Header from '../../Components/Header/header';
import AutocompletareCategorii from '../../Components/Autocompletare/autocompletare-categorii';
import Autocompletare from '../../Components/Autocompletare/autocompletare-orase';

const AllAdsPage = () => {
  const [allAds, setAllAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategorie, setFilterCategorie] = useState('');
  const [filterCity, setFilterCity] = useState(''); // Adăugăm filtru pentru oraș
  const [favoriteAds, setFavoriteAds] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const adsPerPage = 8;

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const selectedCity = searchParams.get('city'); // Obținem orașul din URL

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      try {
        const { data, success } = await adEntity.readAll();
        if (success) {
          console.log('Anunțuri preluate:', data);
          setAllAds(data);
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

    if (selectedCategory) {
      setFilterCategorie(decodeURIComponent(selectedCategory));
    }
    if (selectedCity) {
      setFilterCity(decodeURIComponent(selectedCity));
    }
  }, [selectedCategory, selectedCity]);

  const handleAddFavorite = (ad) => {
    setFavoriteAds((prevFavorites) => [...prevFavorites, ad]);
  };

  const handleRemoveFavorite = (adId) => {
    setFavoriteAds((prevFavorites) =>
      prevFavorites.filter((ad) => ad.id !== adId)
    );
  };

 
  

  const filteredAds = allAds.filter((ad) => {
    const matchCategorie = filterCategorie
      ? ad.categories === filterCategorie
      : true;
    const matchCity = filterCity
      ? ad.city.toLowerCase() === filterCity.toLowerCase()
      : true;
    return matchCategorie && matchCity;
  });

  const sortedAds = [...filteredAds].sort((a, b) => {
    const dateA = new Date(a.createdAt?.seconds * 1000 || 0);
    const dateB = new Date(b.createdAt?.seconds * 1000 || 0);
    return dateB - dateA; // Sortare implicită descrescătoare (cele mai noi)
  });

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = sortedAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(sortedAds.length / adsPerPage);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.filters}>
          <AutocompletareCategorii onSelect={setFilterCategorie} />
          <Autocompletare onSelect={setFilterCity} />
        </div>

        {(filterCategorie || filterCity) && (
          <h2 className={styles.subtitle}>
            Anunțuri
            {filterCategorie && (
              <>
                {' din categoria: '}
                <strong>{filterCategorie}</strong>
              </>
            )}
            {filterCity && (
              <>
                {filterCategorie ? ' | ' : ' '}
                în <strong>{filterCity}</strong>
              </>
            )}
          </h2>
        )}

        {isLoading && (
          <div className={styles.loading}>Se încarcă anunțurile...</div>
        )}
        {error && <div className={styles.error}>{error}</div>}

        {!isLoading && filteredAds.length === 0 && (filterCategorie || filterCity) ? (
          <div className={styles.noAdsMessage}>
            Nu există anunțuri
            {filterCategorie && ` în categoria ${filterCategorie}`}
            {filterCity && ` în ${filterCity}`}.
          </div>
        ) : (
          <>
            <Card
              ads={currentAds}
              isLoading={isLoading}
              error={error}
              onAddFavorite={handleAddFavorite}
              onRemove={handleRemoveFavorite}
              isFavoriteView={false}
              favoriteAds={favoriteAds}
            />

            {filteredAds.length > 0 && (
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`${styles.pageButton} ${
                      currentPage === i + 1 ? styles.pageButtonActive : ''
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllAdsPage;

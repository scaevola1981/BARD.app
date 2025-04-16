import { useEffect, useState } from 'react';
import adEntity from '../../../api/adEntity'; // Importăm adEntity
import Card from '../../Components/Card/card'; // Importăm componenta Card
import AutocompletareCategorii from '../../Components/Autocompletare/autocompletare-categorii';
import Autocompletare from '../../Components/Autocompletare/autocompletare-orase';
import { useSearchParams } from 'react-router-dom';
import styles from './allAdsPage.module.css';
import Header from '../../Components/Header/header';

const AllAdsPage = () => {
  const [allAds, setAllAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategorie, setFilterCategorie] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterCounty, setFilterCounty] = useState('Toate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [favoriteAds, setFavoriteAds] = useState([]);

  const adsPerPage = 8;

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    const fetchAds = async () => {
      const { data, success } = await adEntity.readAll();
      if (success) {
        setAllAds(data);
      }
    };
    fetchAds();

    if (selectedCategory) {
      setFilterCategorie(selectedCategory);
    }
  }, [selectedCategory]);

  const handleAddFavorite = (ad) => {
    setFavoriteAds((prevFavorites) => [...prevFavorites, ad]);
  };

  const handleRemoveFavorite = (adId) => {
    setFavoriteAds((prevFavorites) => prevFavorites.filter((ad) => ad.id !== adId));
  };



  const filteredAds = allAds.filter((ad) => {
    const matchCategorie = filterCategorie ? ad.categories === filterCategorie : true;
    const matchCity = filterCity ? ad.city.toLowerCase() === filterCity.toLowerCase() : true;
    const matchCounty = filterCounty === 'Toate' ? true : ad.county.toLowerCase() === filterCounty.toLowerCase();
    return matchCategorie && matchCity && matchCounty;
  });

  const sortedAds = [...filteredAds].sort((a, b) => {
    const dateA = new Date(a.createdAt?.seconds * 1000 || 0);
    const dateB = new Date(b.createdAt?.seconds * 1000 || 0);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = sortedAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(sortedAds.length / adsPerPage);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Toate Anunțurile</h1>

        {filterCategorie && (
          <h2 className={styles.subtitle}>
            Anunțuri din categoria: <strong>{filterCategorie}</strong>
          </h2>
        )}

        <div className={styles.filters}>
          <AutocompletareCategorii onSelect={setFilterCategorie} />
          <Autocompletare onSelect={setFilterCity} />

          <select
            value={filterCounty}
            onChange={(e) => {
              setFilterCounty(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.select}
          >
            <option value="Toate">Toate județele</option>
            <option value="Vâlcea">Vâlcea</option>
            <option value="București">București</option>
            <option value="Cluj">Cluj</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.select}
          >
            <option value="desc">Cele mai noi</option>
            <option value="asc">Cele mai vechi</option>
          </select>
        </div>

        {/* Card Component pentru a randare anunțurile */}
        <Card
          ads={currentAds}
          isLoading={false}
          error={null}
          onAddFavorite={handleAddFavorite}
          onRemove={handleRemoveFavorite}
          isFavoriteView={false}
          favoriteAds={favoriteAds} // Transmitere lista de favorite
        />

        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageButton} ${currentPage === i + 1 ? styles.pageButtonActive : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAdsPage;

import Header from '../Header/header';
import Navbar from '../NavBar/navBar';
import Categories from '../Categories/categories';
import Card from '../Card/card';
import Footer from '../Footer/footer';
import categoriesData from '../Categories/categoriesData';
import adEntity from '../../../api/adEntity';
import { useEffect, useState } from 'react';
import styles from './home.module.css';

const Home = () => {
  const [latestAds, setLatestAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setIsLoading(true);
        const { data, success } = await adEntity.readAllSorted();
        
        console.log('Date primite de la Firebase:', data); // Debugging
        
        if (success) {
          // Transformă datele pentru compatibilitate
          const adaptedAds = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
            // Dacă este necesar, poți adăuga aici transformări suplimentare
            // De exemplu: image: data[key].image || 'default-image-url'
          }));
          
          setLatestAds(adaptedAds.slice(0, 8));
        } else {
          setError('Nu s-au putut încărca anunțurile');
        }
      } catch (error) {
        console.error('Eroare la preluarea anunțurilor:', error);
        setError(`Eroare: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAds();
  }, []);

  const handleAddFavorite = (ad) => {
    try {
      const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      // Verifică dacă anunțul există deja
      if (existingFavorites.some(fav => fav.id === ad.id)) {
        alert('Acest anunț este deja în lista ta de favorite!');
        return;
      }

      // Salvează doar câmpurile necesare
      const favoriteAd = {
        id: ad.id,
        title: ad.title,
        image: ad.image,
        county: ad.county,
        city: ad.city,
        description: ad.description
      };

      localStorage.setItem(
        'favorites', 
        JSON.stringify([...existingFavorites, favoriteAd])
      );
      alert('Anunț adăugat cu succes la favorite!');
    } catch (error) {
      console.error('Eroare la salvarea favoritei:', error);
      alert('A apărut o eroare. Încearcă din nou.');
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Header />
      <Navbar />
      <Categories categories={categoriesData} />

      <main className={styles.mainContent}>
        <section className={styles.adsSection}>
          <h2 className={styles.sectionTitle}>Cele mai recente anunțuri</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}
          
          <Card
            ads={latestAds}
            isLoading={isLoading}
            error={error}
            onAddFavorite={handleAddFavorite}
            isFavoriteView={false}
          />
          
          {!isLoading && latestAds.length === 0 && (
            <p className={styles.noResults}>Nu există anunțuri disponibile momentan.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

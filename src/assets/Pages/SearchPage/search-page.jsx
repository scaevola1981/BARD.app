import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cardData from '../../Components/Card/cardData';
import Card from '../../Components/Card/card';
import Header from '../../Components/Header/header';
import NavBar from '../../Components/NavBar/navBar';
import Footer from '../../Components/Footer/footer';
import styles from './search-page.module.css'; // Importă stilurile CSS Module

const SearchPage = () => {
  const [carduriFiltrate, setCarduriFiltrate] = useState([]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get('searchTerm') || '';
  const city = queryParams.get('city') || '';
  const category = queryParams.get('category') || '';

  useEffect(() => {
    console.log('Categorie selectata,category');

    if (!Array.isArray(cardData) || cardData.length === 0) {
      console.error('❌ `cardData` nu conține date valide!');
      return;
    }

    const filtrate = cardData.filter((card) => {
      if (!card || typeof card.title !== 'string') return false;

      const titlu = card.title.toLowerCase();
      const judet = card.judet?.toLowerCase() || '';
      const comune = card.comune?.map((c) => c.toLowerCase()) || [];
      const eventDesc = card.eventDescription?.toLowerCase() || '';
      const categorii = card.categories?.map((c) => c.toLowerCase()) || [];
      const orase = card.cities?.map((c) => c.toLowerCase()) || [];

      const potrivireTermeni =
        searchTerm === '' ||
        titlu.includes(searchTerm.toLowerCase()) ||
        judet.includes(searchTerm.toLowerCase()) ||
        comune.some((c) => c.includes(searchTerm.toLowerCase())) ||
        eventDesc.includes(searchTerm.toLowerCase()) ||
        categorii.some((c) => c.includes(searchTerm.toLowerCase()));

      const potrivireOras =
        city === '' || orase.some((c) => c.includes(city.toLowerCase()));

      const potrivireCategorie =
        category === '' || categorii.includes(category.toLowerCase());

      return potrivireTermeni && potrivireOras && potrivireCategorie;
    });

    setCarduriFiltrate(filtrate);
  }, [searchTerm, city, category]);

  return (
    <>
      <Header />
      <NavBar />
      <div className={styles.searchPage}>
        <div className={styles.searchTitle}>
          <h2>Rezultatele căutării</h2>
        </div>
        <div className={styles.searchFilters}></div>
        <div className={styles.searchCard}>
          {carduriFiltrate.length > 0 ? (
            <Card cardData={carduriFiltrate} />
          ) : (
            <p>🤔 Nu s-au găsit rezultate pentru căutarea ta!</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;

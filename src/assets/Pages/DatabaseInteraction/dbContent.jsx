import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adEntity from '../../../api/adEntity';
import Card from '../../Components/Card/card';
import styles from './dbContent.module.css';
import Header from '../../Components/Header/header';
import NavBar from '../../Components/NavBar/navBar';

const DbContent = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const { data, success } = await adEntity.readAllSorted();
        
        if (success) {
          setAds(data);
        } else {
          setError('Nu s-au putut încărca anunțurile');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleCardClick = (id) => {
    console.log('Navigating to ad with ID:', id);
    navigate(`/ad/${id}`);
  };


  // Calcul paginare
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ads.length / itemsPerPage);

  return (
    <>
    <Header />
    <NavBar/>
    <div className={styles.dbContainer}>
      <div className={styles.titleContainer}>
        <h1>Toate anunțurile</h1>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.cardsGrid}>
        <Card 
          ads={currentItems}
          isLoading={loading}
          error={error}
          onCardClick={handleCardClick}
        />
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &laquo; Înapoi
          </button>
          
          <span>Pagina {currentPage} din {totalPages}</span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Înainte &raquo;
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default DbContent;
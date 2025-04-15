import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adEntity from '../../../api/adEntity';
import styles from './adDetails.module.css';
import Header from '../../Components/Header/header';
import NavBar from '../../Components/NavBar/navBar';
import Footer from '../../Components/Footer/footer';

const AdDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        setLoading(true);
        const { data, success } = await adEntity.readById(id);
        
        if (success) {
          setAd(data);
        } else {
          setError('Anunțul nu a fost găsit');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  if (loading) return <div className={styles.loading}>Se încarcă...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!ad) return <div className={styles.notFound}>Anunțul nu există</div>;

  return (
    <>
    <Header />
    <NavBar />
    <div className={styles.detailContainer}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        &larr; Înapoi
      </button>
      
      <h1>{ad.title}</h1>
      
      <div className={styles.imageContainer}>
        <img 
          src={ad.image || 'data:image/svg+xml;base64,...'} 
          alt={ad.title}
          className={styles.mainImage}
        />
      </div>
      
      <div className={styles.detailsGrid}>
        <div className={styles.detailSection}>
          <h2>Informații generale</h2>
          <p><strong>Județ:</strong> {ad.county}</p>
          <p><strong>Oraș:</strong> {ad.city}</p>
          {ad.comune && <p><strong>Comună:</strong> {ad.comune}</p>}
          <p><strong>Data publicării:</strong> {new Date(ad.timestamp).toLocaleDateString()}</p>
        </div>
        
        <div className={styles.descriptionSection}>
          <h2>Descriere</h2>
          <p>{ad.description}</p>
        </div>
        
        <div className={styles.contactSection}>
          <h2>Contact</h2>
          <p><strong>Nume:</strong> {ad.contactName || 'Nespecificat'}</p>
          <p><strong>Telefon:</strong> {ad.phone || 'Nespecificat'}</p>
          <p><strong>Email:</strong> {ad.email || 'Nespecificat'}</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AdDetail;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adEntity from '../../../api/adEntity';
import { createOrGetChat } from '../../../api/createNewChat';
import { auth } from '../../../api/firebase';
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

        if (success && data) {
          setAd(data);

          // Salvează în istoricul anunțurilor vizitate
          try {
            const visited = JSON.parse(
              localStorage.getItem('visitedAds') || '[]'
            );
            if (!visited.includes(id)) {
              const updated = [id, ...visited.filter((vId) => vId !== id)].slice(0, 20);
              localStorage.setItem('visitedAds', JSON.stringify(updated));
            }
          } catch (storageErr) {
            console.warn('Eroare la salvarea în istoric:', storageErr);
          }
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

  const formattedDate = ad.timestamp
    ? new Date(ad.timestamp).toLocaleDateString('ro-RO')
    : 'Dată necunoscută';

  const handleStartChat = async () => {
    if (!auth.currentUser) {
      alert('Trebuie să fii autentificat pentru a trimite un mesaj vânzătorului.');
      navigate('/register');
      return;
    }

    const currentUid = auth.currentUser.uid;

    const sellerUid = ad.userId;
    if (sellerUid && sellerUid === currentUid) {
      alert('Acesta este propriul tău anunț.');
      return;
    }

    try {
      const targetSeller = sellerUid || `seller_${ad.id || 'demo'}`;
      const chatId = await createOrGetChat(currentUid, targetSeller, ad.title);
      navigate(`/chat?chatId=${chatId}`);
    } catch (err) {
      console.error('Eroare la deschiderea chat-ului:', err);
      navigate('/chat');
    }
  };

  return (
    <>
    <Header />
    <NavBar />
    <div className={styles.detailContainer}>
      <h1>{ad.title}</h1>

      <div className={styles.imageContainer}>
        <img
          src={ad.image || 'https://placehold.co/600x400?text=Imagine+Lipsa'}
          alt={ad.title}
          className={styles.mainImage}
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400?text=Imagine+Lipsa';
          }}
        />
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailSection}>
          <h2>Informații generale</h2>
          <p><strong>Județ:</strong> {ad.county}</p>
          <p><strong>Oraș:</strong> {ad.city}</p>
          {ad.comune && <p><strong>Comună:</strong> {ad.comune}</p>}
          <p><strong>Data publicării:</strong> {formattedDate}</p>
        </div>
        
        <div className={styles.descriptionSection}>
          <h2>Descriere</h2>
          <p>{ad.description}</p>
        </div>
        
        <div className={styles.contactSection}>
          <h2>Contact Vânzător</h2>
          <p><strong>Nume:</strong> {ad.contactName || 'Nespecificat'}</p>
          <p><strong>Telefon:</strong> {ad.phone || 'Nespecificat'}</p>
          <p><strong>Email:</strong> {ad.email || 'Nespecificat'}</p>
          <button
            onClick={handleStartChat}
            className={styles.chatButton}
            type="button"
          >
            💬 Trimite Mesaj
          </button>
        </div>
      </div>
      
    </div>
    <button onClick={() => navigate(-1)} className={styles.backButton}>
        &larr; Înapoi
      </button>
    <Footer />
    </>
  );
};

export default AdDetail;

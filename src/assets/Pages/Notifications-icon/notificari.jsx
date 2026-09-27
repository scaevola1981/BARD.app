import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adEntity from '../../../api/adEntity';
import Card from '../../Components/Card/card';
import styles from './notificari.module.css';
import Header from '../../Components/Header/header';

const Notificari = () => {
  const navigate = useNavigate();
  const [anunturi, setAnunturi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        setLoading(true);
        const { data, success } = await adEntity.readAll();
        if (success && Array.isArray(data)) {
          setAnunturi(data.slice(0, 4));
        }
      } catch (err) {
        console.error('Eroare la preluarea anunturilor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnunturi();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.containerNotificari}>
        <h1 className={styles.heading}>Noutăți și Recomandări</h1>
        <div className={styles.gridCards}>
          <Card
            ads={anunturi}
            isLoading={loading}
            onCardClick={(id) => navigate(`/ad/${id}`)}
            hideTitle={true}
          />
        </div>
      </div>
    </>
  );
};

export default Notificari;

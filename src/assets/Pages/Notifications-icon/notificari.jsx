import { useEffect, useState } from 'react';
import adEntity from "../../../api/adEntity";  
import Card from "../../Components/Card/card"; 
import styles from './notificari.module.css'; 
import Header from '../../Components/Header/header'; 

const Notificari = () => {
  const [anunturi, setAnunturi] = useState([]);

  useEffect(() => {
    const fetchAnunturi = async () => {
      // Obține anunțurile din Firebase
      const { data, success } = await adEntity.readAll();
      if (success) {
        const primele4 = data.slice(0, 4); // primele 4 anunțuri
        setAnunturi(primele4);
      }
    };

    fetchAnunturi();  // Apelează funcția pentru a aduce anunțurile
  }, []);

  return (
    <>
    <Header />
    <div className={styles.containerNotificari}> 
      <h1 className={styles.heading}>Anunțuri</h1> 
      <div className={styles.gridCards}> 
        {anunturi.map(anunt => (
          <Card
            key={anunt.id}  
            title={anunt.title || "Fără titlu"}  
            description={anunt.description || "Fără descriere"}  
            imageUrl={anunt.imageUrl || "https://via.placeholder.com/150"}  
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Notificari;






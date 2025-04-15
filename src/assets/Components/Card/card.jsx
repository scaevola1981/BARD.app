import styles from './card.module.css';
import { FaRegHeart, FaTimes } from 'react-icons/fa';

const Card = ({ cardData, isFavoriteView = false, onRemove }) => {
  const handleAddFavorite = (card) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isAlreadyFavorite = existingFavorites.some(fav => fav.id === card.id);
    if (isAlreadyFavorite) {
      alert('Anunțul este deja în favorite.');
      return;
    }

    const updatedFavorites = [...existingFavorites, card];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert('Anunț adăugat la favorite!');
  };

  // Dacă nu avem cardData, nu afișăm nimic
  if (!cardData || cardData.length === 0) return null;

  return (
    <div className={styles.cardsContainer}>
      {!isFavoriteView && (
        <div className={styles.forTitle}>
          <h2 className={styles.cardsTitle}>Anunțuri</h2>
        </div>
      )}
      
      {cardData.map((card) => (
        <div key={card.id} className={styles.containerCard}>
          <img src={card.image} alt={card.title} className={styles.cardImg} />
          <h2 className={styles.cardTitle}>{card.title}</h2>
          <p className={styles.cardInfo}>Județ: {card.judet}</p>
          <p className={styles.cardInfo}>Oraș: {card.cities}</p>
          <p className={styles.cardInfo}>Comuna: {card.comune}</p>
          <p className={styles.cardPara}>{card.eventDescription}</p>
          <div className={styles.cardBtnContainer}>
            {isFavoriteView ? (
              <button
                className={styles.cardBtnRemove}
                onClick={() => onRemove(card.id)}
              >
                <FaTimes className={styles.cardIcon} />
                Remove
              </button>
            ) : (
              <button
                className={styles.cardBtn}
                onClick={() => handleAddFavorite(card)}
              >
                <FaRegHeart className={styles.cardIconHeart} />
                Add to favorite
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
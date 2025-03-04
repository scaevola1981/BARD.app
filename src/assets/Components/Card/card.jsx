import styles from './card.module.css';
import { FaRegHeart } from 'react-icons/fa';

const Card = ({ cardData }) => {
  return (
    <>
      <div className={styles.forTitle}>
        <h2 className={styles.cardsTitle}>Anunturi promovate</h2>
      </div>
      <div className={styles.cardsContainer}>
        {cardData.slice(0, 8).map((card) => (
          <div key={card.key} className={styles.containerCard}>
           
            <img src={card.image} alt={card.title} className={styles.cardImg} />
            <h2 className={styles.cardTitle}>{card.title}</h2>

            <p className={styles.cardInfo}>Județ: {card.judet}</p>
            <p className={styles.cardInfo}>Oras: {card.cities}</p>
            <p className={styles.cardInfo}>Comuna: {card.comune}</p>
            <p className={styles.cardPara}>{card.eventDescription}</p>
            <div className={styles.cardBtnContainer}>
              <button className={styles.cardBtn}>
              <FaRegHeart className={styles.cardIconHeart} />
                Add to favorite</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Card;


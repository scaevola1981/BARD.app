import styles from './card.module.css';
import { FaRegHeart, FaHeart, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Card = ({ 
  ads = [],
  isLoading = false,
  error = null,
  onAddFavorite = () => {},
  onRemove = () => {},
  isFavoriteView = false,
  onCardClick = () => {} ,
  isFavorite = () => false,
  hideTitle = false
}) => {

  if (isLoading) {
    return <div className={styles.loading}>Se încarcă anunțurile...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!ads || ads.length === 0) {
    return <div className={styles.noAds}>Nu există anunțuri disponibile momentan.</div>;
  }

  return (
    <div className={styles.wrapper}>
      {!isFavoriteView && !hideTitle && (
        <h2 className={styles.cardsTitle}>Cele mai recente anunturi !</h2>
      )}

      <div className={styles.cardsGrid}>
        {ads.map((ad) => {
          const favoriteActive = Boolean(isFavorite(ad.id));

          return (
            <div 
              key={ad.id} 
              className={styles.containerCard}
              onClick={() => onCardClick(ad.id)}
            >
              <img
                src={ad.image || 'https://placehold.co/300x200?text=Imagine+Lipsă'}
                alt={ad.title}
                className={styles.cardImg}
                onError={(e) => {
                  e.target.src = 'https://placehold.co/300x200?text=Imagine+Lipsă';
                }}
              />
              <h2 className={styles.cardTitle}>{ad.title}</h2>
              <p className={styles.cardInfo}>Județ: {ad.county}</p>
              <p className={styles.cardInfo}>Oraș: {ad.city}</p>
              {ad.comune && <p className={styles.cardInfo}>Comuna: {ad.comune}</p>}
              <p className={styles.cardPara}>{ad.description}</p>

              <div className={styles.cardBtnContainer}>
                {isFavoriteView ? (
                  <button
                    className={styles.cardBtnRemove}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(ad.id);
                    }}
                  >
                    <FaTimes className={styles.cardIcon} />
                    Șterge
                  </button>
                ) : (
                  <button
                    className={favoriteActive ? styles.cardBtnActive : styles.cardBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (favoriteActive) {
                        onRemove(ad.id);
                      } else {
                        onAddFavorite(ad); 
                      }
                    }}
                  >
                    {favoriteActive ? (
                      <>
                        <FaHeart className={styles.cardIconHeartActive} />
                        <span>Favorit</span>
                      </>
                    ) : (
                      <>
                        <FaRegHeart className={styles.cardIconHeart} />
                        <span>Adaugă la favorite</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Card.propTypes = {
  ads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      county: PropTypes.string,
      city: PropTypes.string,
      comune: PropTypes.string,
      description: PropTypes.string,
      timestamp: PropTypes.number
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onAddFavorite: PropTypes.func,
  onRemove: PropTypes.func,
  isFavoriteView: PropTypes.bool,
  onCardClick: PropTypes.func,
  isFavorite: PropTypes.func

};

export default Card;



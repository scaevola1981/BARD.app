import './card.css';
import { FaRegHeart } from 'react-icons/fa';

const Card = ({ cardData }) => {
  return (
    <>
      <div className="for-title">
        <h2 className="cards-title">Anunturi promovate</h2>
      </div>
      <div className="cards-container">
        {cardData.map((card) => (
          <div key={card.key} className="container-card">
               <FaRegHeart className="card-icon-heart" />
            <img src={card.image} alt={card.title} className="card-img" />
            <h2 className="card-title">{card.title}</h2>
         
            <p className="card-info">Județ: {card.judet}</p>
            <p className="card-info">Oras:{card.cities}</p>
            <p className="card-info">Comuna:{card.comune}</p>
            <p className="card-para">{card.eventDescription}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Card;

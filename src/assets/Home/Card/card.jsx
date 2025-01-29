import './card.css';
import cardData from './cardData';
import {  FaRegHeart } from 'react-icons/fa';

const Card = () => {
  return (
    <>
      <div className="for-title">
        <h2 className="cards-title">Anunturi promovate</h2>
      </div>
      <div className="cards-container">
        {cardData.map((card) => (
          <div key={card.id} className="container-card">
            <img className="card-img" src={card.image} alt={card.title} />
            <h2 className="card-title">{card.title}</h2>
            <FaRegHeart className='card-icon-heart'/>
            <p className="card-para">{card.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;

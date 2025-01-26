import './card.css';
import cardData from './cardData';

const Card = () => {
  return (
    <div className="cards-container">
      {cardData.map((card) => (
        <div key={card.id} className="container-card">
          <img className='card-img' src={card.image} alt={card.title} />
          <h2 className='card-title'>{card.title}</h2>
          <p className='card-para'>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;

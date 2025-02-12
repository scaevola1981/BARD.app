const categoryImage = {
  Imobiliare: './foto-icons/logo-imobiliare.png',
  Electronice: './foto-icons/logo-electronic.png',
  Modă: './foto-icons/logo-moda.png',
  Echipamente: './foto-icons/logo-equipments.png',
  ItSoftware: './foto-icons/logo-it.png',
  Animale: './foto-icons/logo-animals.png',
  Cărți: './foto-icons/logo-books.png',
  ProduseLocale: './foto-icons/logo-food.png',
  Muzică: './foto-icons/logo-music.png',
  Cultură: './foto-icons/logo-antiques.png',
  Artizanat: './foto-icons/logo-hobby.png',
  Gastronomie: './foto-icons/logo-food.png',
  PeșteProduseMarine: './foto-icons/logo-food.png',
  Teatru: './foto-icons/logo-antiques.png',
  Antichități: './foto-icons/logo-antiques.png',
  default: './foto-icons/logo-others.png', 
};

const CardFoto = ({ category }) => {
  console.log("Category received:" ,category)
  const imageUrl = categoryImage[category] || categoryImage['default'];

  return<img src={imageUrl} alt={category} className="card-img" />;
};

export default CardFoto;

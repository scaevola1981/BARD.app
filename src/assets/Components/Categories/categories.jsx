import './categories.css';

const Categories = () => {
  return (
    <div className="container-categories ">
      <div className="title">
        <h2>Categorii principale</h2>
      </div>
      <div className="categories-container">
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-imobiliare.png"
            alt=""
          />
          <span className="span-btn">Imobiliare</span>
        </button>
        <button className="category-btn">
          <img className="img-foto" src="./foto-icons/logo-car.png" alt="" />
          <span className="span-btn">Mașini și Piese </span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-electronic.png"
            alt=""
          />
          <span className="span-btn">Electronice</span>
        </button>
        <button className="category-btn">
          <img className="img-foto" src="./foto-icons/logo-fashion.png" alt="" />
          <span className="span-btn">Modă</span>
        </button>
        <button className="category-btn">
          <img className="img-foto" src="./foto-icons/logo-hobby.png" alt="" />
          <span className="span-btn">Hobby și Crafting</span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-garden.png"
            alt=""
          />
          <span className="span-btn">Casă și Grădină</span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-mobilier.png"
            alt=""
          />
          <span className="span-btn">Mobilier/Decorațiuni</span>
        </button>
        <button className="category-btn">
          <img className="img-foto" src="./foto-icons/logo-books.png" alt="" />
          <span className="span-btn">Cărți/Filme,Muzică</span>
        </button>
        <button className="category-btn">
          <img className="img-foto" src="./foto-icons/logo-equipment.png" alt="" />
          <span className="span-btn">Echipamente</span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-food.png"
            alt=""
          />
          <span className="span-btn">Produse Alimentare</span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-sports.png"
            alt=""
          />
          <span className="span-btn">Articole Sportive</span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-animals.png
            "
            alt=""
          />
          <span className="span-btn">Animale</span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-voluntary.png"
            alt=""
          />
          <span className="span-btn">Voluntariat</span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-antiques.png"
            alt=""
          />
          <span className="span-btn">Antichități </span>
        </button>
        <button className="category-btn">
          <img
            className="img-foto"
            src="./foto-icons/logo-it.png"
            alt=""
          />
          <span className="span-btn">IT și Software</span>
        </button>
        <button className="category-btn">
          <img className="img-foto" src="./foto-icons/logo-others.png" alt="" />
          <span className="span-btn">Altele</span>
        </button>
      </div>
    </div>
  );
};

export default Categories;

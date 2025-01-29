import './categories.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Categories = () => {
  return (
    <div className="container-categories ">
      <div className="title">
        <h2>Categorii principale</h2>
      </div>
      <div className="categories-container">
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-imobiliare.jpg"
            alt=""
            effect="blur"
          />
          <span className="span-btn">Imobiliare</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-masini.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Mașini și Piese </span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-electronice.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Electronice</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-moda.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Modă</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-hobby.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Hobby și Crafting</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-casa-gradina.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Casă și Grădină</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-mobilier.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Mobilier/Decorațiuni</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-carti.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Cărți/Filme,Muzică</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-unelte.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Echipamente</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-alimente.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Produse Alimentare</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-articole-sportive.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Articole Sportive</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-animale.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Animale</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-voluntairs.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Voluntariat</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-antiques.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Antichități </span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-it-software.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">IT și Software</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/logo-altele.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Altele</span>
        </button>
      </div>
    </div>
  );
};

export default Categories;

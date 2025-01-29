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
            src="./foto-icons/imagines-categories/imobiliare.jpg"
            alt=""
            effect="blur"
          />
          <span className="span-btn">Imobiliare</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/masini.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Mașini și Piese </span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/electronice.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Electronice</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/moda.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Modă</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/hobby-crafting.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Hobby și Crafting</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/casa-gradina.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Casă și Grădină</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/mobilier-decoratiuni.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Mobilier/Decorațiuni</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/carti.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Cărți/Filme,Muzică</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/unelte.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Unelte și Echipamente</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/produse-alimentare.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Produse Alimentare</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/articole-sportive.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Articole Sportive</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/animale.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Animale</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/voluntariat.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Servicii</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/antichitati.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">Antichități </span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/it-software.jpg"
            alt=""
            effect='blur'
          />
          <span className="span-btn">IT și Software</span>
        </button>
        <button className="category-btn">
          <LazyLoadImage
            className="img-foto"
            src="./foto-icons/imagines-categories/altele.jpg"
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

import './categories.css';

const Categories = ({ categories }) => {
  return (
    <>
      <div className="container-categories">
        <h2>CATEGORII PRINCIPALE</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <button key={category.id} className="category-btn">
              <img
                src={category.image}
                alt="category.name"
                className="img-foto"
              />
              <span className="span-btn">{category.name}</span>
            </button>
          ))}
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

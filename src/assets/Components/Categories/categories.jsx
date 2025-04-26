import styles from './categories.module.css';
import { useNavigate } from 'react-router';
// import { useTheme } from '../../../api/themeContext';


const Categories = ({ categories }) => {

  // const { theme } = useTheme();// Folosim ThemeContext

   const navigate = useNavigate();

   const handleCategoryClick = (categoryName) => {
    navigate(`/anunturi?category=${encodeURIComponent(categoryName)}`)
   };


  return (
    <div className={styles.containerCategories}>
      <h2>CATEGORII PRINCIPALE</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <button key={category.id} 
                  className={styles.categoryBtn}
                  onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className={styles.imgFoto}
              
            />
            <span className={styles.spanBtn}>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;


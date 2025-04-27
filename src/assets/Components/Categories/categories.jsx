import styles from './categories.module.css';
import { useNavigate } from 'react-router';

const Categories = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/anunturi?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className={styles.containerCategories}>
      <h2>CATEGORII PRINCIPALE</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryWrapper}>
            <button
              className={styles.categoryBtn}
              onClick={() => handleCategoryClick(category.name)}
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <span className={styles.spanBtn}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;


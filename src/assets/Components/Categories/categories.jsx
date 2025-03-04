import styles from './categories.module.css';

const Categories = ({ categories }) => {
  return (
    <div className={styles.containerCategories}>
      <h2>CATEGORII PRINCIPALE</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <button key={category.id} className={styles.categoryBtn}>
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


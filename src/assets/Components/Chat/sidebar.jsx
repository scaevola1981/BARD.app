// Sidebar.jsx
import styles from './sidebar.module.css';

const Sidebar = ({ children, className }) => {
  return <aside className={`${styles.sidebar} ${className}`}>{children}</aside>;
};

export default Sidebar;
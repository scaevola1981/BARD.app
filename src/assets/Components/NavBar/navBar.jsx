

import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar-container ">
      <nav className="navbar">
        <div className="input-group">
          <input type="text" className="input-text" placeholder="Ce cauți?" />
          <input type="text" className="input-city" placeholder="Toată țara" />
          <button className="search-btn">
            Caută
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

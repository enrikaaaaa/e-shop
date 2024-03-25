import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../Button/Button";
import styles from "./NavigationBar.module.scss";

const NavigationBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
        </div>
        <ul
          className={showMenu ? `${styles.menu} ${styles.show}` : styles.menu}
        >
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/hotels">Hotels</Link>
          </li>
        </ul>
        <div>
          <Button className={styles.buttonLogOut}></Button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;

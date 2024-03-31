import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../Button/Button";
import styles from "./NavigationBar.module.scss";
import { navigationBarLinks } from "../../routes/consts";

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
          <div className={styles.logo}>
            <img src="../../src/assets/pictures/logo.png" alt="Logo" />
          </div>
          {navigationBarLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.title}
            </Link>
          ))}
        </ul>
        <div>
          <Button className={styles.buttonLogOut}></Button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;

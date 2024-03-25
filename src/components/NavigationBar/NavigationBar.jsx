import { Link } from "react-router-dom";
import Button from "../Button/Button";
// import styles from "./NavigationBar.module.scss";

const NavigationBar = () => {
  return (
    <header>
      <nav>
        <Link>Orders</Link>
        <Link>Hotels</Link>
      </nav>
      <Button>Log out</Button>
    </header>
  );
};

export default NavigationBar;

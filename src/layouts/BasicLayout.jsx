import "./BasicLayout.css";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/ThemeContexts/ThemeContexts";
import { useContext } from "react";

const BasicLayout = ({ children }) => {
  const { toggleDarkMode } = useContext(ThemeContext);
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <NavigationBar />

      <div className={`container ${darkMode ? "darkMode" : "lightMode"}`}>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
        {children}
      </div>
    </>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;

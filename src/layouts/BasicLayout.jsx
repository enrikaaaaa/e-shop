import PropTypes from "prop-types";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const BasicLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;

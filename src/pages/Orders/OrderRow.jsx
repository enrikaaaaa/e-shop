import { Link, generatePath } from "react-router-dom";
import PropTypes from "prop-types";
import { FaDollarSign } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { ROUTES } from "../../routes/consts";
import styles from "./Orders.module.scss";

const OrderRow = ({ order, people, onOrderClick }) => {
  const orderPath = generatePath(ROUTES.ORDER, { id: order.id });

  const handleClick = () => {
    onOrderClick(order);
  };

  return (
    <Link to={orderPath} className={styles.orderRow} onClick={handleClick}>
      <div className={styles.columnItem}>
        <IoPerson className={styles.icon} />
        <span>{people.username}</span>
      </div>
      <div className={styles.columnItem}>
        <span>{order.createDate}</span>
      </div>
      <div className={styles.columnItem}>
        <FaDollarSign className={styles.icon} />
        <span>{order.productPrice}</span>
      </div>
    </Link>
  );
};

OrderRow.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    usernameId: PropTypes.string,
    productPrice: PropTypes.number,
    createDate: PropTypes.string,
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
      })
    ),
  }),
  people: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
  onOrderClick: PropTypes.func.isRequired,
};

export default OrderRow;

import { useEffect, useState } from "react";

import Button from "../../components/Button/Button";
import { FaCalendarAlt } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import PropTypes from "prop-types";
import { fetchOrderById } from "../../api/orders";
import { fetchUserById } from "../../api/users";
import styles from "./Orders.module.scss";

const OrderRow = ({ order, onEditOrder, onDeleteOrder }) => {
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await fetchOrderById(order.id);
        const userData = await fetchUserById(orderData.peopleId);
        setCustomerName(userData.name);
      } catch (error) {
        console.error("Error fetching order or user data:", error);
      }
    };
    fetchData();
  }, [order.id]);

  const handleEdit = () => {
    onEditOrder(order.id);
  };

  const handleDelete = () => {
    onDeleteOrder(order.id);
  };

  const totalPriceValue = isNaN(order.totalPrice) ? 0 : order.totalPrice;

  return (
    <div className={styles.orderRow}>
      <div className={styles.columnItem}>
        <div className={styles.iconItem}>
          <IoPerson className={styles.icon} />
          <div>{customerName}</div>
        </div>
        <div className={styles.iconItem}>
          <FaCalendarAlt className={styles.icon} />
          <div>{order.createDate}</div>
        </div>
        <div className={styles.iconItem}>
          <FaDollarSign className={styles.icon} />
          <div>{totalPriceValue}</div>
        </div>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

OrderRow.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    peopleId: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    createDate: PropTypes.string.isRequired,
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
      }).isRequired
    ),
  }),
  people: PropTypes.object.isRequired,
  onEditOrder: PropTypes.func.isRequired,
  onDeleteOrder: PropTypes.func.isRequired,
};

export default OrderRow;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Order.module.scss";
import { IoPerson } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import PropTypes from "prop-types";
import { fetchOrderById } from "../../api/orders";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderById(id)
      .then((data) => setOrder(data))
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.order}>
      <div className={styles.info}>
        <IoPerson className={styles.icon} />
        <span>Customer: {order.customerName}</span>
      </div>
      <div className={styles.info}>
        <span>Date: {order.createDate}</span>
      </div>
      <div className={styles.info}>
        <FaDollarSign className={styles.icon} />
        <span>Total Price: {order.totalPrice}</span>
      </div>
      <div className={styles.info}>
        <span>Order ID: {order.id}</span>
      </div>
      <div className={styles.info}>
        <span>Ordered Items:</span>
        <ul>
          {order.orderItems &&
            order.orderItems.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity} - Price: {item.price}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    customerName: PropTypes.string,
    totalPrice: PropTypes.number,
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
};

export default Order;

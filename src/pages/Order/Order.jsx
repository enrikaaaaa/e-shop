import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Order.module.scss";
import { IoPerson } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { fetchOrderById } from "../../api/orders";
import { fetchUserById } from "../../api/users";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await fetchOrderById(id);
        setOrder(orderData);

        const userData = await fetchUserById(orderData.peopleId);
        setCustomerName(userData.name);

        setLoading(false);
      } catch (error) {
        console.error("Klaida gaunant užsakymą:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Kraunama...</div>;
  }

  return (
    <div className={styles.order}>
      <div className={styles.info}>
        <IoPerson className={styles.icon} />
        <span>Klientas: {customerName}</span>
      </div>
      <div className={styles.info}>
        <span>Data: {order.createDate}</span>
      </div>
      <div className={styles.info}>
        <FaDollarSign className={styles.icon} />
        <span>Viso kaina: {order.totalPrice}</span>
      </div>
      <div className={styles.info}>
        <span>Užsakymo ID: {order.id}</span>
      </div>
      <div className={styles.info}>
        <span>Užsakytos prekės:</span>
        <ul>
          {order.products &&
            order.products.map((product, index) => (
              <li key={`${product.id}-${index}`}>
                {product.title} - Kiekis: {product.quantity} - Kaina:{" "}
                {product.price}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Order;

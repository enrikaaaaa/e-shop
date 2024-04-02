import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../api/orders";
import { fetchUserById } from "../../api/users";
import { FaDollarSign } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import styles from "./Order.module.scss";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await fetchOrderById(id);
        const userData = await fetchUserById(orderData.peopleId);
        setOrder(orderData);
        setCustomerName(userData.name);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.order}>
      <h1>Užsakymas</h1>
      <div className={styles.infoBlock}>
        <div className={styles.info}>
          <div>
            <IoPerson className={styles.icon} />
            Klientas:
          </div>
          <div> {customerName}</div>
        </div>
        <div className={styles.info}>
          <div>
            <FaCalendarAlt className={styles.icon} /> Data:
          </div>
          <div>{order.createDate}</div>
        </div>
        <div className={styles.info}>
          <div>
            <FaDollarSign className={styles.icon} />
            Viso kaina:
          </div>
          <div> {order.totalPrice}</div>
        </div>
        <div className={styles.info}>
          <div>Užsakymo ID:</div> <div>{order.id}</div>
        </div>
        <div className={styles.info}>
          <div>Užsakytos prekės:</div>
        </div>
      </div>
      <div className={styles.productsContainer}>
        {order.products &&
          order.products.map((product, index) => (
            <div key={`${product.productId}-${index}`}>
              <span className={styles.productTitle}>
                {product.productTitle}
              </span>
              <span className={styles.product}>
                - Kiekis: {product.productQuantity}
              </span>
              <span className={styles.product}>
                - Kaina: {product.productPrice}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Order;

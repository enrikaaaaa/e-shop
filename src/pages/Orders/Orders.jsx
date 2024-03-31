import { useState, useEffect } from "react";
import { fetchOrders } from "../../api/orders";
import { fetchUsers } from "../../api/users";
import OrderRow from "./OrderRow";
import styles from "./Orders.module.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, usersResponse] = await Promise.all([
          fetchOrders(),
          fetchUsers(),
        ]);
        setOrders(ordersResponse);
        setUsers(usersResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.columnHeaderContainer}>
        <div className={styles.columnHeader}>Klientas</div>
        <div className={styles.columnHeader}>Data</div>
        <div className={styles.columnHeader}>Viso kaina</div>
      </div>
      {orders.map((order) => (
        <OrderRow
          key={order.id}
          order={order}
          people={users.find((user) => user.id === order.peopleId)}
          onOrderClick={handleOrderClick}
        />
      ))}
      {selectedOrder && (
        <div className={styles.selectedOrderDetails}>
          <h2>Selected Order Details</h2>
          <p>Order ID: {selectedOrder.id}</p>
          <p>Customer Name: {selectedOrder.customerName}</p>
          <p>Total Price: {selectedOrder.totalPrice}</p>
          <p>Create Date: {selectedOrder.createDate}</p>
          <p>Order Items:</p>
          <ul>
            {selectedOrder.orderItems.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity} - Price: {item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;

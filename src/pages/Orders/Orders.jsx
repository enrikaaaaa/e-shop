import { useState, useEffect } from "react";
import { fetchOrders, deleteOrder } from "../../api/orders";
import { fetchUsers } from "../../api/users";
import OrderRow from "./OrderRow";
import styles from "./Orders.module.scss";
import Button from "../../components/Button/Button";
import NewOrderModal from "./NewOrderModal"; // Update import path

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setInitialData(null);
  };

  const handleFormSubmit = () => {
    handleModalClose();
    window.location.reload();
  };

  const handleEditOrder = (orderId) => {
    const orderToEdit = orders.find((order) => order.id === orderId);
    setInitialData(orderToEdit);
    handleModalOpen(); // Open the modal after setting initial data
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className={styles.ordersContainer}>
      <Button className={styles.newProductButton} onClick={handleModalOpen}>
        Add New Order
      </Button>
      <NewOrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        initialData={initialData}
      />
      <div className={styles.columnHeaderContainer}>
        <div>Customer</div>
        <div>Date</div>
        <div>Total Price</div>
        <div>Actions</div>
      </div>
      {orders.map((order) => (
        <OrderRow
          key={order.id}
          order={{ ...order, peopleId: order.peopleId.toString() }}
          people={users.find((user) => user.id === order.peopleId)}
          onOrderClick={handleOrderClick}
          onEditOrder={handleEditOrder}
          onDeleteOrder={handleDeleteOrder}
        />
      ))}
    </div>
  );
};

export default Orders;

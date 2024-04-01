import axios from "axios";

export const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:8000/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const createOrder = async (newOrder) => {
  try {
    const response = await axios.post("http://localhost:8000/orders", newOrder);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchOrderById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/orders/${id}`);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const createUser = async (newUser) => {
  try {
    const response = await axios.post("http://localhost:8000/users", newUser);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};
export const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/users/${id}`);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/users/${userId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update order: " + error.message);
  }
};

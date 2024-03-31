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

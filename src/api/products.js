import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8000/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const createProduct = async (newProduct) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/products",
      newProduct
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

import axios from "axios";

const baseURL = "http://localhost:8000/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (newProduct) => {
  try {
    const response = await axios.post(baseURL, newProduct);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${baseURL}/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

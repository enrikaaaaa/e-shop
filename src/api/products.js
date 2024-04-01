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

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/products/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/products/${id}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

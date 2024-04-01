import { useState, useEffect } from "react";
import { fetchProducts } from "../../api/products";
import { createProduct } from "../../api/products";
import { deleteProduct } from "../../api/products";
import styles from "./Products.module.scss";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    price: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProductData);
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
      setNewProductData({
        name: "",
        price: 0,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productsContainer}>
      <Button className={styles.newProductButton} onClick={handleModalOpen}>
        Add New Product
      </Button>
      <div className={styles.columnHeaderContainer}>
        <div className={styles.columnHeader}>Product Name</div>
        <div className={styles.columnHeader}>Price</div>
      </div>
      {products.map((product) => (
        <div className={styles.productRow} key={product.id}>
          <div className={styles.columnItem}>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <Button onClick={() => handleDelete(product.id)}>X</Button>
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={newProductData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newProductData.price}
              onChange={handleChange}
              required
            />
          </label>

          <Button type="submit">Add Product</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Products;

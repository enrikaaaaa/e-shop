import { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import PropTypes from "prop-types";
import { createOrder } from "../../api/orders";
import { fetchUsers } from "../../api/users";
import { fetchProducts } from "../../api/products"; // Import fetchProducts
import styles from "./NewOrderModal.module.scss";
import Select from "react-select";

const NewOrderModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    products: [{ productTitle: "", productQuantity: 1, productPrice: 0 }],
    createDate: "",
    totalPrice: 0,
    peopleId: "",
    peopleName: "",
  });
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]); // State for product options
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const users = await fetchUsers();
        setCustomerList(users);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchProductsData = async () => {
      // Fetch products data
      try {
        const products = await fetchProducts();
        setProductList(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCustomers();
    fetchProductsData();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = formData.products.reduce(
        (total, product) =>
          total + product.productPrice * product.productQuantity,
        0
      );
      setFormData((prevData) => ({
        ...prevData,
        totalPrice,
      }));
    };

    calculateTotalPrice();
  }, [formData.products]);

  const handleChange = (newValue, index) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = newValue;
    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));
  };

  const handleAddProduct = () => {
    setFormData((prevData) => ({
      ...prevData,
      products: [
        ...prevData.products,
        { productTitle: "", productQuantity: 1, productPrice: 0 },
      ],
    }));
  };

  const handleRemoveProduct = (index) => {
    if (formData.products.length === 1) return;
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString("lt-LT");

    const updatedFormData = {
      ...formData,
      createDate: currentDate,
      peopleId: selectedCustomer ? selectedCustomer.id : "",
      peopleName: selectedCustomer ? selectedCustomer.name : "",
    };

    try {
      const newOrder = await createOrder(updatedFormData);
      onSubmit(newOrder);
      onClose();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.selectContainer}>
          <label htmlFor="customerSelect">Select Customer:</label>
          <Select
            id="customerSelect"
            value={selectedCustomer}
            onChange={(value) => setSelectedCustomer(value)}
            options={customerList}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            placeholder="Select Customer"
          />
        </div>
        {formData.products.map((product, index) => (
          <div key={index} className={styles.productInputContainer}>
            <Select
              value={product}
              onChange={(value) => handleChange(value, index)}
              options={productList}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              placeholder="Select Product"
            />
            <input
              type="number"
              name="productQuantity"
              placeholder="Quantity"
              value={product.productQuantity}
              onChange={(e) =>
                handleChange(
                  { ...product, productQuantity: e.target.value },
                  index
                )
              }
              required
            />
            <input
              type="number"
              name="productPrice"
              placeholder="Price"
              value={product.productPrice}
              onChange={(e) =>
                handleChange(
                  { ...product, productPrice: e.target.value },
                  index
                )
              }
              required
            />
            <Button
              type="button"
              onClick={() => handleRemoveProduct(index)}
              disabled={formData.products.length === 1}
            >
              x
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddProduct}>
          Add Product
        </Button>
        <div>Total Price: ${formData.totalPrice.toFixed(2)}</div>
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
};

NewOrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewOrderModal;

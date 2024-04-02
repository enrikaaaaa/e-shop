import { useState, useEffect, useCallback } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import PropTypes from "prop-types";
import { createOrder, updateOrder } from "../../api/orders";
import { fetchUsers } from "../../api/users";
import { fetchProducts } from "../../api/products";
import styles from "./NewOrderModal.module.scss";
import Select from "react-select";

const NewOrderModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    products: initialData
      ? initialData.products.map((product) => ({
          productId: product.productId,
          productTitle: product.productTitle,
          productQuantity: product.productQuantity,
          productPrice: product.productPrice,
        }))
      : [
          {
            productId: "",
            productTitle: "",
            productQuantity: "1",
            productPrice: 0,
          },
        ],
    createDate: "",
    totalPrice: 0,
    peopleId: "",
    peopleName: "",
  });
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, products] = await Promise.all([
          fetchUsers(),
          fetchProducts(),
        ]);
        setCustomerList(users);
        setProductList(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setSelectedCustomer({
        id: initialData.peopleId,
        name: initialData.peopleName,
      });
      setFormData((prevData) => ({
        ...prevData,
        products: initialData.products.map((product) => ({
          productId: product.productId,
          productTitle: product.productTitle,
          productQuantity: product.productQuantity,
          productPrice: product.productPrice,
        })),
      }));
    }
  }, [initialData, formData]);

  const calculateTotalPrice = useCallback(() => {
    const totalPrice = formData.products.reduce(
      (total, product) =>
        total + product.productPrice * product.productQuantity,
      0
    );
    setFormData((prevData) => ({
      ...prevData,
      totalPrice,
    }));
  }, [formData.products]);

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.products, calculateTotalPrice]);

  const handleChange = (value, index) => {
    const product = productList.find((p) => p.id === value.id);
    if (!product) {
      console.error(`Product not found for ID: ${value.id}`);
      return;
    }

    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productId: value.id,
      productTitle: value.name,
      productPrice: product.price,
    };
    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));

    calculateTotalPrice();
  };

  const handleQuantityChange = (e, index) => {
    const quantity = parseInt(e.target.value);
    if (isNaN(quantity) || quantity < 1) return;

    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productQuantity: quantity,
    };
    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));

    calculateTotalPrice();
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
      if (initialData) {
        const updatedOrder = await updateOrder(
          initialData.orderId,
          updatedFormData
        );
        onSubmit(updatedOrder);
      } else {
        const newOrder = await createOrder(updatedFormData);
        onSubmit(newOrder);
      }
      onClose();
    } catch (error) {
      console.error("Error handling order:", error);
    }
  };

  const handleAddProduct = () => {
    setFormData((prevData) => ({
      ...prevData,
      products: [
        ...prevData.products,
        {
          productId: "",
          productTitle: "",
          productQuantity: "",
          productPrice: 0,
        },
      ],
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{initialData ? "Edit Order" : "Add New Order"}</h2>
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
            placeholder="Select customer"
            required
          />
        </div>
        {formData.products.map((product, index) => (
          <div key={index} className={styles.productInputContainer}>
            <div>Selected Product: {product.productTitle}</div>
            <Select
              value={productList.find((p) => p.productId === product.productId)}
              onChange={(value) => handleChange(value, index)}
              options={productList}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              placeholder="Select product"
              required
            />

            <div>
              Quantity:
              <input
                type="number"
                value={product.productQuantity}
                onChange={(e) => handleQuantityChange(e, index)}
                min="1"
                required
              />
            </div>

            <Button
              type="button"
              onClick={() => handleRemoveProduct(index)}
              disabled={formData.products.length === 1}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddProduct}>
          Add Product
        </Button>
        <div>Total Price: ${formData.totalPrice.toFixed(2)}</div>
        <Button type="submit">{initialData ? "Update" : "Submit"}</Button>
      </form>
    </Modal>
  );
};

NewOrderModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  initialData: PropTypes.object,
};

export default NewOrderModal;

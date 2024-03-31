const fakeOrder = {
  id: 1,
  customerName: "John Doe",
  totalPrice: 100,
  createDate: "2021-09-01",
  orderItems: [
    {
      id: 1,
      name: "Product 1",
      price: 50,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: 25,
      quantity: 2,
    },
  ],
};
const fakeOrder1 = {
  id: 2,
  customerName: "Ben Doe",
  totalPrice: 100,
  createDate: "2021-09-01",
  orderItems: [
    {
      id: 1,
      name: "Product 1",
      price: 50,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: 25,
      quantity: 2,
    },
  ],
};
const fakeOrder2 = {
  id: 3,
  customerName: "Fon Doe",
  totalPrice: 100,
  createDate: "2021-09-01",
  orderItems: [
    {
      id: 1,
      name: "Product 1",
      price: 50,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: 25,
      quantity: 2,
    },
  ],
};

export const fakeOrders = [fakeOrder, fakeOrder1, fakeOrder2];

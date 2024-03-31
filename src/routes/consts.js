import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Orders from "../pages/Orders/Orders";
import Order from "../pages/Order/Order";
import BasicLayout from "../layouts/BasicLayout";
import AuthLayout from "../layouts/AuthLayout";

export const ROUTES = {
  LOGIN: "/",
  REGISTER: "/register",
  ORDERS: "/orders",
  ORDER: "/orders/:id",
  PRODUCTS: "/products",
};

export const routes = [
  {
    path: ROUTES.LOGIN,
    Component: Login,
    Layout: AuthLayout,
  },
  {
    path: ROUTES.REGISTER,
    Component: Register,
    Layout: AuthLayout,
  },
  {
    path: ROUTES.ORDERS,
    Component: Orders,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.ORDER,
    Component: Order,
    Layout: BasicLayout,
  },
  // {
  //   path: ROUTES.ORDER,
  //   Component: Products,
  //   Layout: BasicLayout,
  // },
];

export const navigationBarLinks = [
  {
    title: "Orders",
    path: ROUTES.ORDERS,
  },
  {
    title: "Products",
    path: ROUTES.PRODUCTS,
  },
];

import AuthLayout from "../layouts/AuthLayout";
import BasicLayout from "../layouts/BasicLayout";
import Login from "../pages/Login/Login";
import NewOrder from "../pages/Orders/NewOrderModal";
import Order from "../pages/Order/Order";
import Orders from "../pages/Orders/Orders";
import Products from "../pages/Products/Products";
import Register from "../pages/Register/Register";
import Users from "../pages/Users/Users";

export const ROUTES = {
  LOGIN: "/",
  REGISTER: "/register",
  ORDERS: "/orders",
  ORDER: "/orders/:id",
  PRODUCTS: "/products",
  NEWORDER: "/new-order",
  USERS: "/users",
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
  {
    path: ROUTES.NEWORDER,
    Component: NewOrder,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.PRODUCTS,
    Component: Products,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.USERS,
    Component: Users,
    Layout: BasicLayout,
  },
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
  {
    title: "Users",
    path: ROUTES.USERS,
  },
];

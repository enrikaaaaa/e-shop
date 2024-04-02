import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Orders from "../pages/Orders/Orders";
import Order from "../pages/Order/Order";
import BasicLayout from "../layouts/BasicLayout";
import AuthLayout from "../layouts/AuthLayout";
import NewOrder from "../pages/Orders/NewOrderModal";
import Products from "../pages/Products/Products";
import Users from "../pages/Users/Users";

export const ROUTES = {
  REGISTER: "/",
  LOGIN: "/login",
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

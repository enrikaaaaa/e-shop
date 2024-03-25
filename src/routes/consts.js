import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Orders from "../pages/Orders/Orders";
import BasicLayout from "../layouts/BasicLayout";
import AuthLayout from "../layouts/AuthLayout";

export const ROUTES = {
  LOGIN: "/",
  REGISTER: "/register",
  ORDERS: "/orders",
  HOTELS: "/hotels",
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
];

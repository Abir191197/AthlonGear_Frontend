import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import OrderSummary from "../pages/OrderSummary";
import Error404 from "../pages/Error404";
import AllProducts from "../pages/AllProducts";
import ManageProduct from "../pages/ManageProduct";



const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "ProductView/:id",
    element: <Product></Product>,
  },
  {
    path: "Product/Cart",
    element: <Cart></Cart>,
  },
  {
    path: "/CheckOut",
    element: <OrderSummary></OrderSummary>,
  },
  {
    path: "/Products/AllProducts",
    element: <AllProducts></AllProducts>,
  },
  {
    path: "/Products/MangeProduct",
    element: <ManageProduct></ManageProduct>,
  },
]);

export default routes;

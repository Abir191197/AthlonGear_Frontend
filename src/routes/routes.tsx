import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import OrderSummary from "../pages/OrderSummary";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

export default routes;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Product from "../pages/Product";
import Cart from "../pages/Cart";


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
]);

export default routes;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Product from "../pages/Product";


const routes = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    
  },
  {
   
        path: "ProductView/:id",
        element: <Product></Product>,
 
  }
]);

export default routes;

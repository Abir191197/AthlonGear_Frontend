import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Provider } from "react-redux";

import { persistor, store } from './redux/store';
import { RouterProvider } from "react-router-dom";
import router from './routes/routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from 'redux-persist/integration/react';



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>

      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
 
import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./stores";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
const { store, persistor } = configureStore();

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
   process.env.NODE_ENV === "development" ? "/" : "http://15.164.20.183:3003";

ReactDOM.render(
   <BrowserRouter>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <App />
         </PersistGate>
      </Provider>
   </BrowserRouter>,
   document.getElementById("root")
);

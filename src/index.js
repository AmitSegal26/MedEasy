import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//react-router-dom
import { BrowserRouter } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./store/bigRedux";

//axios
import axios from "axios";
//css
import "./index.css";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    /*
      if the token exists in localStorage
      this mean that the user logged in and
      we want to send the token in the headers with each request
      that was send
    */
    config.headers["x-auth-token"] = token;
  }
  return config; // send the new data
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

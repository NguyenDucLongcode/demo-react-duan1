import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./component/User/User";
import Admin from "./component/Admin/Admin";
import HomePage from "./component/HomePage/HomePage";
import DashBoard from "./component/Admin/DashBoard";
import ManagerUser from "./component/Admin/ManageUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Routes>
        {/* add */}
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<Users />} />
        </Route>
        {/* admin */}
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manager-users" element={<ManagerUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

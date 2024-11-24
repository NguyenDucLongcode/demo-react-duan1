import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import Users from "./component/User/User";
import Admin from "./component/Admin/Admin";
import HomePage from "./component/HomePage/HomePage";
import DashBoard from "./component/Admin/DashBoard";
import ManagerUser from "./component/Admin/ManageUser";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import { PersistGate } from "redux-persist/integration/react";
import ListQuiz from "./component/User/ListQuiz";
import Details from "./component/User/Details";
import ManagerQuiz from "./component/Admin/Quiz/ManagerQuiz";
import ManagerQuestion from "./component/Admin/Question/ManagerQuestion";

const root = ReactDOM.createRoot(document.getElementById("root"));
const NotFound = () => {
  return (
    <div className="container alert alert-warning">
      404.Not found data with your current URL
    </div>
  );
};
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <Routes>
          {/* add */}
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="users" element={<ListQuiz />} />
          </Route>
          <Route path="/quiz/:id" element={<Details />} />
          {/* admin */}
          <Route path="/admins" element={<Admin />}>
            <Route index element={<DashBoard />} />
            <Route path="manager-users" element={<ManagerUser />} />
            <Route path="manager-quiz" element={<ManagerQuiz />} />
            <Route path="manager-question" element={<ManagerQuestion />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

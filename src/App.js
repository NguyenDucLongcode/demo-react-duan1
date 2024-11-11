import logo from "./logo.svg";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import React from "react";
import MyComponent from "./component/MyConponent";
class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <p>Edit and long handsome </p>
        <MyComponent></MyComponent>
      </div>
    );
  }
}

export default App;

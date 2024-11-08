import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "Long",
    age: 2000,
  };
  handlerClick = (event) => {
    this.setState({ name: "Dragon", age: Math.floor(Math.random() * 101) });
  };
  handlerMouseOver = (event) => {
    console.log(event.pageX);
  };

  //jsx
  render() {
    return (
      <div>
        My name is {this.state.name}. My age is {this.state.age}
        <button onClick={this.handlerClick}>Click me!</button>
        <button onMouseOver={this.handlerMouseOver}>Hover me!</button>
      </div>
    );
  }
}
export default MyComponent;

import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "Long",
    age: 2000,
  };
  handlerOnChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handlerOnSubmit = (event) => {
    event.preventDefault();
    document.querySelector("form").reset();
    console.log(this.state);
  };
  //jsx
  render() {
    return (
      <div>
        My name is {this.state.name}. My age is {this.state.age}
        <form
          onSubmit={(event) => {
            this.handlerOnSubmit(event);
          }}
        >
          <input
            type="text"
            onChange={(event) => {
              this.handlerOnChange(event);
            }}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default MyComponent;

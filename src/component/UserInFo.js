import React from "react";
class UserInFo extends React.Component {
  state = {
    name: "Long",
    age: 2000,
  };
  handlerOnChangeName = (event) => {
    this.setState({ name: event.target.value });
  };
  handlerOnChangeAge = (event) => {
    this.setState({ age: event.target.value });
  };
  handlerOnSubmit = (event) => {
    event.preventDefault();
    document.querySelector("form").reset();
    console.log(this.state);
  };
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
            placeholder="Enter your name"
            type="text"
            onChange={(event) => {
              this.handlerOnChangeName(event);
            }}
          ></input>
          <br />
          <input
            placeholder="Enter your age"
            type="number"
            onChange={(event) => {
              this.handlerOnChangeAge(event);
            }}
          ></input>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default UserInFo;

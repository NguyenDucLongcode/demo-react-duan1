import React from "react";
import AddUser from "./AddUser";
import MyInfor from "./MyInfor";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Dragon", age: "16" },
      { id: 2, name: "Long", age: "24" },
      { id: 3, name: "KingDragon", age: 30 },
    ],
  };
  addListUser = (ObjectUser) => {
    this.setState({ listUsers: [ObjectUser, ...this.state.listUsers] });
  };
  render() {
    return (
      <div>
        <AddUser addListUser={this.addListUser} />
        <MyInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}
export default MyComponent;

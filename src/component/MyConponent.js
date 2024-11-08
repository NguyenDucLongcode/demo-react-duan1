import React from "react";
import UserInFo from "./UserInFo";
import MyInfor from "./MyInfor";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Dragon", age: 26 },
      { id: 2, name: "Long", age: 24 },
      { id: 3, name: "KingDragon", age: 30 },
    ],
  };
  //jsx
  render() {
    return (
      <div>
        <UserInFo />
        <MyInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}
export default MyComponent;

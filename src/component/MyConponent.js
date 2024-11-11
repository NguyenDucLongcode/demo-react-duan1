import React, { useState } from "react";
import AddUser from "./AddUser";
import MyInfor from "./MyInfor";
import "./DisplayInfor.scss";
// class MyComponent extends React.Component {
//   state = {
//     listUsers: [
//       { id: 1, name: "Dragon", age: "16" },
//       { id: 2, name: "Long", age: "24" },
//       { id: 3, name: "KingDragon", age: 30 },
//     ],
//   };
//   addListUser = (ObjectUser) => {
//     this.setState({ listUsers: [ObjectUser, ...this.state.listUsers] });
//   };
//   deleteListUser = (userId) => {
//     let listUsersClone = [...this.state.listUsers];
//     listUsersClone = listUsersClone.filter((items) => items.id !== userId);
//     this.setState({ listUsers: listUsersClone });
//   };
//   render() {
//     return (
//       <>
//         <AddUser addListUser={this.addListUser} />
//         <MyInfor
//           listUsers={this.state.listUsers}
//           deleteListUser={this.deleteListUser}
//         />
//       </>
//     );
//   }
// }
const MyComponent = (props) => {
  const [listUsers, setisListUser] = useState([
    { id: 1, name: "Dragon", age: "16" },
    { id: 2, name: "Long", age: "24" },
    { id: 3, name: "KingDragon", age: 30 },
  ]);
  const addListUser = (ObjectUser) => {
    setisListUser([ObjectUser, ...listUsers]);
  };
  const deleteListUser = (userId) => {
    let listUsersClone = [...listUsers];
    listUsersClone = listUsersClone.filter((items) => items.id !== userId);
    setisListUser(listUsersClone);
  };
  return (
    <>
      <AddUser addListUser={addListUser} />
      <MyInfor listUsers={listUsers} deleteListUser={deleteListUser} />
    </>
  );
};
export default MyComponent;

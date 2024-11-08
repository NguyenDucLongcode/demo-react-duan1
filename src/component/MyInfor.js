import React from "react";
class MyInfor extends React.Component {
  render() {
    const { listUsers } = this.props;
    return (
      <div>
        {listUsers.map((user) => {
          console.log(user);
          return (
            <div key={user.id}>
              <div>My name's {user.name}</div>
              <div>My age is {user.age}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default MyInfor;

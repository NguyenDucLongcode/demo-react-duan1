import React from "react";
class MyInfor extends React.Component {
  state = {
    showListUsers: true,
  };
  handleShowHide = () => {
    this.setState({ showListUsers: !this.state.showListUsers });
  };
  render() {
    const { listUsers } = this.props;
    return (
      <div>
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.showListUsers ? "Hide list users" : "Show list users"}
          </span>
        </div>
        {this.state.showListUsers && (
          <div>
            {listUsers.map((user) => {
              console.log(user);
              return (
                <div key={user.id} className={user.age < 18 ? "red" : "green"}>
                  <div>My name's {user.name}</div>
                  <div>My age is {user.age}</div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default MyInfor;

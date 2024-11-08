import React from "react";
class MyInfor extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div>My name's {this.props.name}</div>
        <div>My age is {this.props.age}</div>
      </div>
    );
  }
}
export default MyInfor;

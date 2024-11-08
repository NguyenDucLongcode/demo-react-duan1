import React from "react";
import UserInFo from "./UserInFo";
import MyInfor from "./MyInfor";
class MyComponent extends React.Component {
  //jsx
  render() {
    // const myAge = 26;
    const myJob = ["Dog", "Student", "Teacher", "Doctor"];
    return (
      <div>
        <UserInFo />
        <MyInfor name="Dragon" age={26} myJob={myJob} />
        <hr></hr>
        <MyInfor name="Long" age="29" />
      </div>
    );
  }
}
export default MyComponent;

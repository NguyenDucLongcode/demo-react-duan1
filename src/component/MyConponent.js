import React from "react";
class MyComponent extends React.Component {
  //jsx
  render() {
    return (
      <div>
        My first Component
        {Math.floor(Math.random() * 101)};
      </div>
    );
  }
}
export default MyComponent;

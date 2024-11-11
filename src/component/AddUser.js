import React, { useState } from "react";
// class AddUser extends React.Component {
//   state = {
//     name: "Long",
//     age: 2000,
//   };
//   handlerOnChangeName = (event) => {
//     this.setState({ name: event.target.value });
//   };
//   handlerOnChangeAge = (event) => {
//     this.setState({ age: event.target.value });
//   };
//   handlerOnSubmit = (event) => {
//     event.preventDefault();
//     document.querySelector("form").reset();
//     this.props.addListUser({
//       id: Math.floor(Math.random() * 100 + 1) + "radom",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   render() {
//     return (
//       <div>
//         My name is {this.state.name}. My age is {this.state.age}
//         <form
//           onSubmit={(event) => {
//             this.handlerOnSubmit(event);
//           }}
//         >
//           <input
//             placeholder="Enter your name"
//             type="text"
//             onChange={(event) => {
//               this.handlerOnChangeName(event);
//             }}
//           ></input>
//           <br />
//           <input
//             placeholder="Enter your age"
//             type="number"
//             onChange={(event) => {
//               this.handlerOnChangeAge(event);
//             }}
//           ></input>
//           <br />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }
const AddUser = (props) => {
  const [name, setName] = useState("Long");
  const [age, setAge] = useState(2000);
  const handlerOnChangeName = (event) => {
    setName(event.target.value);
  };
  const handlerOnChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handlerOnSubmit = (event) => {
    event.preventDefault();
    document.querySelector("form").reset();
    props.addListUser({
      id: Math.floor(Math.random() * 100 + 1) + "radom",
      name: name,
      age: age,
    });
  };
  return (
    <div>
      My name is {name}. My age is {age}
      <form
        onSubmit={(event) => {
          handlerOnSubmit(event);
        }}
      >
        <input
          placeholder="Enter your name"
          type="text"
          onChange={(event) => {
            handlerOnChangeName(event);
          }}
        ></input>
        <br />
        <input
          placeholder="Enter your age"
          type="number"
          onChange={(event) => {
            handlerOnChangeAge(event);
          }}
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddUser;

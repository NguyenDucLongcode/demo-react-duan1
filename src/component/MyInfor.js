import React, { useEffect, useState } from "react";
// class MyInfor extends React.Component {
//   state = {
//     showListUsers: true,
//   };
//   handleShowHide = () => {
//     this.setState({ showListUsers: !this.state.showListUsers });
//   };
//   render() {
//     const { listUsers } = this.props;
//     return (
//       <div>
//         <div>
//           <span
//             onClick={() => {
//               this.handleShowHide();
//             }}
//           >
//             {this.state.showListUsers ? "Hide list users" : "Show list users"}
//           </span>
//         </div>
//         {this.state.showListUsers && (
//           <>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={user.age < 18 ? "red" : "green"}>
//                   <div>My name's {user.name}</div>
//                   <div>My age is {user.age}</div>
//                   <div>
//                     <button
//                       onClick={() => {
//                         this.props.deleteListUser(user.id);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <hr></hr>
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }
const MyInfor = (props) => {
  const { listUsers } = props;
  const [isListUser, setisListUser] = useState(true);
  const handleShowHideListUsers = () => {
    setisListUser(!isListUser);
  };
  useEffect(() => {
    if (listUsers.length === 0) {
      alert("List users is empty");
    }
  }, [listUsers]);
  return (
    <div>
      <div>
        <span
          onClick={() => {
            handleShowHideListUsers();
          }}
        >
          {isListUser ? "Hide list users" : "Show list users"}
        </span>
      </div>
      {isListUser && (
        <>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={user.age < 18 ? "red" : "green"}>
                <div>My name's {user.name}</div>
                <div>My age is {user.age}</div>
                <div>
                  <button
                    onClick={() => {
                      props.deleteListUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <hr></hr>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
export default MyInfor;

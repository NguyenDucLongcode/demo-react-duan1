import { useState, useEffect } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ModalManageUser.scss";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "./tableUser";
import { getListUsers } from "../../services/aipServices";
import ModalUpdateUser from "./ModalUpdateUser";

const ManagerUser = (props) => {
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const [isShowModalUpdateUser, setIsShowModalUpdateUser] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const handleSubmitBtnUpdateUser = (dataUser) => {
    setIsShowModalUpdateUser(true);
    setDataUpdateUser(dataUser);
  };
  // const
  useEffect(() => {
    fetchListUser();
  }, []);
  const fetchListUser = async () => {
    let res = await getListUsers();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  return (
    <div className="ManagerUser-container">
      <div className="MangerUser-title">ManageUser</div>
      <div className="MangerUser-content">
        <div className="MangerUser-btn">
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsShowModalCreateUser(true);
            }}
          >
            Add New User
          </button>
        </div>
        <div className="MangerUser-table">
          <TableUser
            listUser={listUser}
            handleSubmitBtnUpdateUser={handleSubmitBtnUpdateUser}
          />
        </div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
        <ModalUpdateUser
          show={isShowModalUpdateUser}
          setShow={setIsShowModalUpdateUser}
          handleSubmitBtnUpdateUser={handleSubmitBtnUpdateUser}
          dataUpdateUser={dataUpdateUser}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};
export default ManagerUser;

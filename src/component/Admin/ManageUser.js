import { useState, useEffect } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ModalManageUser.scss";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "./tableUser";
import { getListUsers, getUserWithPaginate } from "../../services/aipServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManagerUser = (props) => {
  const Limit_User = 9;
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const [isShowModalUpdateUser, setIsShowModalUpdateUser] = useState(false);
  const [isShowViewUser, setIsShowViewUser] = useState(false);
  const [isShowDeleteUser, setIsShowDeleteUser] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [dataViewUser, setDataViewUser] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  //delete user
  const handleBtnDeleteUser = (dataDelete) => {
    setIsShowDeleteUser(true);
    setDataDeleteUser(dataDelete);
  };
  // view user
  const handleBtnViewUser = (dataViewUser) => {
    setIsShowViewUser(true);
    setDataViewUser(dataViewUser);
  };
  // update user
  const handleSubmitBtnUpdateUser = (dataUser) => {
    setIsShowModalUpdateUser(true);
    setDataUpdateUser(dataUser);
  };
  // const
  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaginate(currentPage);
  }, []);
  const fetchListUser = async () => {
    let res = await getListUsers();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  const fetchListUserWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, Limit_User);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
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
            handleBtnViewUser={handleBtnViewUser}
            handleBtnDeleteUser={handleBtnDeleteUser}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={isShowModalUpdateUser}
          setShow={setIsShowModalUpdateUser}
          handleSubmitBtnUpdateUser={handleSubmitBtnUpdateUser}
          dataUpdateUser={dataUpdateUser}
          setDataUpdateUser={setDataUpdateUser}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={isShowViewUser}
          setShow={setIsShowViewUser}
          dataViewUser={dataViewUser}
          setDataViewUser={setDataViewUser}
        />
        <ModalDeleteUser
          show={isShowDeleteUser}
          setShow={setIsShowDeleteUser}
          dataDeleteUser={dataDeleteUser}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../services/aipServices";
import { toast } from "react-toastify";
const ModalDeleteUser = (props) => {
  const { show, setShow, dataDeleteUser, currentPage, setCurrentPage } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClickDelete = async () => {
    let data = await deleteUser(dataDeleteUser.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUser();
      await props.fetchListUserWithPaginate(1);
      setCurrentPage(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          you want to delete user with Email is "{dataDeleteUser.email}"
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClickDelete()}>
            Sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;

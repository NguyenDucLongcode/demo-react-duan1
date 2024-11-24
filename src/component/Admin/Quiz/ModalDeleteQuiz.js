import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizForServer } from "../../../services/aipServices";
import { toast } from "react-toastify";
const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataIdQuizDelete } = props;
  const handleClose = () => setShow(false);
  const handleClickDelete = async () => {
    let res = await deleteQuizForServer(dataIdQuizDelete);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      await props.fetchListQuiz();
      handleClose();
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>You want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClickDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;

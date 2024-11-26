import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ShowModalAnswer = (props) => {
  const { show, setShow, data } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>You Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Question: <b>{data.countTotal}</b>
          </div>
          <div>
            Total Correct Answer: <b>{data.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show answer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowModalAnswer;

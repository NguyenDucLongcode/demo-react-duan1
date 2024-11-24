import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { putQuizForSever } from "../../../services/aipServices";
import { toast } from "react-toastify";
const ModalEditQuiz = (props) => {
  const { show, setShow, data } = props;
  const handleClose = () => setShow(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState(null);
  const handleChangeImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleClickSave = async () => {
    let res = await putQuizForSever(
      data.id,
      description,
      name,
      difficulty,
      image
    );
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={data.name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={data.description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Difficulty</Form.Label>
                <Form.Select
                  defaultValue={data.difficulty}
                  onChange={(event) => setDifficulty(event.target.value)}
                >
                  <option>EASY</option>
                  <option>MEDIUM</option>
                  <option>HARD</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => {
                    handleChangeImage(event);
                  }}
                />
              </Form.Group>
              <div className="preview-image">
                <img
                  src={`data:image/jpeg;base64,${data.image}`}
                  alt="preview"
                />
              </div>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClickSave();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditQuiz;

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import _ from "lodash";
const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdateUser } = props;
  useEffect(() => {
    console.log(dataUpdateUser);
    if (!_.isEmpty(dataUpdateUser)) {
      //update state
      setEmail(dataUpdateUser.email);
      setUsername(dataUpdateUser.username);
      setRole(dataUpdateUser.role);
      if (dataUpdateUser.image !== "") {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdateUser.image}`);
      }
    }
  }, [dataUpdateUser]);
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const updatePreviewImg = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setPreviewImage("");
    } else {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  return (
    <>
      <Modal
        className="modal-create-user"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                  placeholder="Enter email"
                  disabled
                  value={email}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                  disabled
                  value={password}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  value={username}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  onChange={(event) => {
                    setRole(event.target.value);
                  }}
                  value={role}
                >
                  <option value={"USER"}>USER</option>
                  <option value={"ADMIN"}>ADMIN</option>
                </Form.Select>
              </Form.Group>
              {/* file */}
              <Form.Group className="position-relative mb-4">
                <Form.Label>Update file image</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    updatePreviewImg(event);
                  }}
                  type="file"
                  required
                  name="file"
                />
                <Form.Control.Feedback
                  type="invalid"
                  tooltip
                ></Form.Control.Feedback>
              </Form.Group>
              <div className="Modal-preview-img">
                {previewImage ? (
                  <img src={previewImage} alt="" />
                ) : (
                  <span> Preview Img</span>
                )}
              </div>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;

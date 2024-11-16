import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { potCreateUser } from "../../services/aipServices";
const ModalCreateUser = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
  };
  const handleShow = () => setShow(true);
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
  const handleSubmit = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }
    //gọi api đưa data lên backend

    let data = await potCreateUser(email, password, username, role, image);
    console.log("check ", data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListUser();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
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
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;

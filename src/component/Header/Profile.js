import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useSelector } from "react-redux";
import "./Profile.scss";
import { postUpdateProfile } from "../../services/aipServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const { show, setShow } = props;
  // state redux
  const userNameForReduxStore = useSelector(
    (state) => state.user.account.username
  );

  const dataImageForReduxStore = useSelector(
    (state) => state.user.account.image
  );
  //state react
  const [userName, setUserName] = useState(userNameForReduxStore);
  const [imageForRaw, setImageRaw] = useState(dataImageForReduxStore);
  const [imageForUser, setImageForUser] = useState("");
  const [previewImageForUser, setPreviewImageForUser] = useState("");

  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const handleEmailChange = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPreviewImageForUser(URL.createObjectURL(event.target.files[0]));
      setImageForUser(event.target.files[0]);
    }
  };
  const handleSummitClick = async () => {
    let res = await postUpdateProfile(userName, imageForUser);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleCloseClick();
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  const handleCloseClick = () => {
    handleClose();
    setPreviewImageForUser("");
    setUserName(userNameForReduxStore);
  };
  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Profile">
              <FloatingLabel
                controlId="floatingInput"
                label="UserName"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={userName}
                  onChange={(event) => {
                    handleEmailChange(event);
                  }}
                />
              </FloatingLabel>
              <label htmlFor={"input_file"}>
                {" "}
                <MdOutlineAddPhotoAlternate className="img-icon" />
                <span className="update-image">Update Image</span>
              </label>
              <input
                type="file"
                id="input_file"
                hidden
                onChange={(event) => {
                  handleChangeImg(event);
                }}
              ></input>
              <div className="preview-image">
                {previewImageForUser ? (
                  <img src={previewImageForUser} alt="preview" />
                ) : dataImageForReduxStore ? (
                  <img
                    src={`data:image/jpeg;base64,${imageForRaw}`}
                    alt="preview"
                  />
                ) : (
                  "No image"
                )}
              </div>
            </Tab>
            {/* Change Password */}
            <Tab eventKey="profile" title="Change Password">
              <FloatingLabel
                controlId="floatingInput"
                label="Current Password"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="New Password">
                <Form.Control type="text" placeholder="Password" />
              </FloatingLabel>
            </Tab>
            <Tab eventKey="contact" title="History">
              Tab content for Contact
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseClick();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSummitClick();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;

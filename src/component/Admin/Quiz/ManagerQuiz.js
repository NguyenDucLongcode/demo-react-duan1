import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./ManagerQuiz.scss";
import Select from "react-select";
import { useEffect, useState } from "react";
import { postAddQuiz, getQuizForSever } from "../../../services/aipServices";
import { toast } from "react-toastify";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalEditQuiz from "./ModalEditQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
const ManagerQuiz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState(null);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataCurrentModalEdit, setDataCurrentModalEdit] = useState({});
  const [dataApiModal, setDataApiModal] = useState("");
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataIdQuizDelete, setDataIdQuizDelete] = useState("");
  // get value image
  const handleChangeImg = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  useEffect(() => {
    fetchListQuiz();
  }, []);
  const fetchListQuiz = async () => {
    setDataApiModal(await getQuizForSever());
  };

  const handleClickAddQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name and description are required");
      return;
    }
    if (!image) {
      toast.error("Image is required");
      return;
    }
    // call Api
    let res = await postAddQuiz(description, name, difficulty.value, image);
    if (res && res.EC === 0) {
      fetchListQuiz();
      toast.success(res.EM);
      setDescription("");
      setName("");
      setImage(null);
    } else {
      toast.error(res.EM);
      alert(res.EM);
    }
  };
  return (
    <div className="managerQuiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="title">Manager Quiz</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-newQuiz">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add New Quiz</legend>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Your Name quiz"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Your Name quiz"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Description">
                  <Form.Control
                    type="text"
                    placeholder="description"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                  />
                </FloatingLabel>
                <div className="my-3">
                  <Select
                    defaultValue={difficulty}
                    onChange={setDifficulty}
                    options={options}
                  />
                </div>
                <div>
                  <label>Update Img</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => handleChangeImg(event)}
                  ></input>
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleClickAddQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="table-detail mt-5">
        <TableQuiz
          setShow={setIsShowModalEdit}
          setDataCurrentModalEdit={setDataCurrentModalEdit}
          dataApiModal={dataApiModal}
          setIsShowModalDelete={setIsShowModalDelete}
          setDataIdQuizDelete={setDataIdQuizDelete}
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
      <ModalEditQuiz
        show={isShowModalEdit}
        setShow={setIsShowModalEdit}
        data={dataCurrentModalEdit}
        fetchListQuiz={fetchListQuiz}
      />
      <ModalDeleteQuiz
        show={isShowModalDelete}
        setShow={setIsShowModalDelete}
        dataIdQuizDelete={dataIdQuizDelete}
        fetchListQuiz={fetchListQuiz}
      />
    </div>
  );
};
export default ManagerQuiz;

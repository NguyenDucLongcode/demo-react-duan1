import Table from "react-bootstrap/Table";
import { getQuizForSever } from "../../../services/aipServices";
import { useState, useEffect } from "react";
import _ from "lodash";
const TableQuiz = (props) => {
  const {
    setShow,
    setDataCurrentModalEdit,
    dataApiModal,
    setIsShowModalDelete,
    setDataIdQuizDelete,
  } = props;
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchQuizData();
  }, [dataApiModal]);
  const fetchQuizData = () => {
    if (!_.isEmpty(dataApiModal)) {
      setListQuiz(dataApiModal.DT);
    }
  };
  const handleClickEdit = (dataCurrent) => {
    setShow(true);
    setDataCurrentModalEdit(dataCurrent);
  };
  const handleClickDelete = (QuizId) => {
    setIsShowModalDelete(true);
    setDataIdQuizDelete(QuizId);
  };
  return (
    <>
      <div>
        <b>Table List Quiz:</b>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>difficulty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning "
                      onClick={() => {
                        handleClickEdit(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => {
                        handleClickDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
export default TableQuiz;

import Select from "react-select";
import { useState, useEffect } from "react";
import { getQuizForSever, getListUsers } from "../../../services/aipServices";
const AssignToUsers = (props) => {
  const [selectedOptionQuiz, setSelectedOptionQuiz] = useState({});
  const [listQuestion, setListQuestion] = useState("");
  const [selectedOptionUser, setSelectedOptionUser] = useState({});
  const [listUser, setListUser] = useState("");
  useEffect(() => {
    fetchListQuiz();
    fetchListUser();
  }, []);

  const fetchListQuiz = async () => {
    let resQuestion = await getQuizForSever();
    if (resQuestion && resQuestion.EC === 0) {
      setListQuestion(
        resQuestion.DT.map((question) => ({
          value: question.id,
          label: `${question.id} - ${question.description}`,
        }))
      );
    }
  };

  const fetchListUser = async () => {
    let resUsers = await getListUsers();
    console.log(resUsers);
    if (resUsers && resUsers.EC === 0) {
      setListUser(
        resUsers.DT.map((user) => ({
          value: user.id,
          label: `${user.id} - ${user.username}- ${user.email}`,
        }))
      );
    }
  };

  return (
    <div className="assign-container row">
      {" "}
      <div className="select-quiz col-6">
        <div className="mt-3 ">
          <b>Select Quiz</b>
        </div>
        <div className="select-quiz">
          <Select
            defaultValue={selectedOptionQuiz}
            onChange={setSelectedOptionQuiz}
            options={listQuestion}
          />
        </div>
      </div>
      <div className="select-user col-6">
        <div className="mt-3 ">
          <b>Select Users</b>
        </div>
        <div className="select-quiz">
          <Select
            defaultValue={selectedOptionUser}
            onChange={setSelectedOptionUser}
            options={listUser}
          />
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-warning">Assign</button>
      </div>
    </div>
  );
};
export default AssignToUsers;
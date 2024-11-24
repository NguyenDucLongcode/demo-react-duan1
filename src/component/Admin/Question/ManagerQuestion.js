import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./ManagerQuestion.scss";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import Select from "react-select";
import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
const ManagerQuestion = (props) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "Question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "Answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, questionId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      let newQuestions = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questionsClone, newQuestions]);
      return;
    }
    if (type === "REMOVE") {
      questionsClone = questionsClone.filter((item) => item.id !== questionId);
      setQuestions(questionsClone);
      return;
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (type === "ADD") {
      let newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
      return;
    }
    if (type === "REMOVE") {
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
      return;
    }
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="question-container">
      <div className="title">ManagerQuestion</div>
      <div className="add-new-question">
        <div>
          <div className="mt-3">
            <b>Select Quiz</b>
          </div>
          <div className="select-quiz">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <div className="mt-4">
            <b>Add Question</b>
          </div>
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <>
                  <div className="question-content">
                    <div className="floating-description">
                      <FloatingLabel
                        label={`Question ${index + 1} 's description`}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="name@example.com"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="update-image">
                      <label>
                        <RiImageAddFill className="label-img" />
                      </label>
                      <input type="file" hidden />
                      <span> 0 file is update</span>
                    </div>
                    <div className="btn-group">
                      <span
                        className="btn-add"
                        onClick={() => handleAddRemoveQuestion("ADD", "")}
                      >
                        <IoIosAddCircle />
                      </span>
                      {questions && questions.length > 1 && (
                        <span
                          className="btn-remove"
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", question.id)
                          }
                        >
                          <IoIosRemoveCircle />
                        </span>
                      )}
                    </div>
                  </div>
                  {/* answers */}
                  {question.answers.length > 0 &&
                    question.answers.map((answer, index) => {
                      return (
                        <div className="answer-content">
                          <input
                            className="form-check-input checkBox"
                            type="checkbox"
                          />
                          <div className="floating-answer">
                            <FloatingLabel
                              label={`Answer ${index + 1}`}
                              className="mb-3"
                            >
                              <Form.Control
                                type="text"
                                placeholder="name@example.com"
                              />
                            </FloatingLabel>
                          </div>
                          <div className="btn-group">
                            <span
                              className="btn-add"
                              onClick={() =>
                                handleAddRemoveAnswer("ADD", question.id, "")
                              }
                            >
                              <IoIosAddCircle />
                            </span>
                            {question.answers.length > 1 && (
                              <span
                                className="btn-remove"
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    "REMOVE",
                                    question.id,
                                    answer.id
                                  )
                                }
                              >
                                <IoIosRemoveCircle />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ManagerQuestion;

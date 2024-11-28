import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./QuizUpdateQA.scss";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import Select from "react-select";
import { useState, useEffect } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getQuizForSever,
  getQuestionForServer,
  postUpsertQA,
} from "../../../services/aipServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const QuizUpdateQA = (props) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [listQuestion, setListQuestion] = useState("");
  const [dataPreview, setDataPreview] = useState({
    url: "",
    title: "",
  });
  const [init, setInit] = useState([
    {
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
      ],
    },
  ]);
  const [questions, setQuestions] = useState(init);

  useEffect(() => {
    fetchListQuiz();
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

  useEffect(() => {
    if (selectedOption.value) {
      fetchListQuestion();
    }
  }, [selectedOption]);

  const fetchListQuestion = async () => {
    let res = await getQuestionForServer(selectedOption.value);
    if (res && res.EC === 0) {
      // convert string file to abject file
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };

  // return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

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

  const handleOnChangeQuestion = (type, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && type === "DESCRIPTION") {
      questionsClone[index].description = value;
      setQuestions(questionsClone);
    }
    if (index > -1 && type === "IMAGE" && value) {
      questionsClone[index].imageFile = value;
      questionsClone[index].imageName = value[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleOnChangeAnswer = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId && type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (answer.id === answerId && type === "INPUT") {
            answer.description = value;
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };

  const handleClickSummit = async () => {
    // TODO: validate and send data to server
    // validate selected
    if (!selectedOption.value) {
      toast.error("Please select quiz!");
      return;
    }

    // validate answer
    let isValidAnswer = true,
      indexAnswer = 0,
      indexQuestion2 = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexAnswer = j;
          indexQuestion2 = i;
          break;
        }
      }
      if (!isValidAnswer) {
        break;
      }
    }
    if (!isValidAnswer) {
      toast.error(
        `Please fill description at answer ${indexAnswer + 1} for question ${
          indexQuestion2 + 1
        } !`
      );
      return;
    }

    // validate question
    let isValidQuestion = true,
      indexQuestion = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQuestion = i;
        break;
      }
    }
    if (!isValidQuestion) {
      toast.error(
        `Please fill description for question  ${indexQuestion + 1}!`
      );
      return;
    }

    // convert file based 64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    // call api method
    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(
          questionsClone[i].imageFile
        );
      }
    }
    console.log(">> clone", questionsClone);
    let res = await postUpsertQA({
      quizId: selectedOption.value,
      questions: questionsClone,
    });
    console.log(">> res", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  const handleClickShowImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataPreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="question-container">
      <div className="add-new-question">
        <div className="select-quiz-content">
          <div className="mt-3">
            <b>Select Quiz</b>
          </div>
          <div className="select-quiz">
            <Select
              // defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={listQuestion}
            />
          </div>
        </div>

        <div className="q-a-content">
          <div className="mt-4">
            <b>Add Question</b>
          </div>
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div key={`${index}+question`}>
                  <div className="question-content">
                    <div className="floating-description">
                      <FloatingLabel
                        label={`Question ${index + 1} 's description`}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="name@example.com"
                          value={question.description}
                          onChange={(event) => {
                            handleOnChangeQuestion(
                              "DESCRIPTION",
                              question.id,
                              event.target.value
                            );
                          }}
                        />
                      </FloatingLabel>
                    </div>
                    <div className="update-image">
                      <label htmlFor={`${question.id}`}>
                        <RiImageAddFill className="label-img" />
                      </label>
                      <input
                        id={`${question.id}`}
                        type="file"
                        hidden
                        onChange={(event) => {
                          handleOnChangeQuestion(
                            "IMAGE",
                            question.id,
                            event.target.files
                          );
                        }}
                      />
                      <span className="previewImg ms-2 mt-2">
                        {question.imageName ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleClickShowImage(question.id);
                            }}
                          >
                            {question.imageName}
                          </span>
                        ) : (
                          "0 file updated"
                        )}
                      </span>
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
                        <div key={`${index}+answer`} className="answer-content">
                          <input
                            className="form-check-input checkBox"
                            type="checkBox"
                            checked={answer.isCorrect}
                            onChange={(event) =>
                              handleOnChangeAnswer(
                                "CHECKBOX",
                                question.id,
                                answer.id,
                                event.target.checked
                              )
                            }
                          />
                          <div className="floating-answer">
                            <FloatingLabel
                              label={`Answer ${index + 1}`}
                              className="mb-3"
                            >
                              <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                value={answer.description}
                                onChange={(event) =>
                                  handleOnChangeAnswer(
                                    "INPUT",
                                    question.id,
                                    answer.id,
                                    event.target.value
                                  )
                                }
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
                </div>
              );
            })}
          {questions.length > 0 && (
            <div>
              <button
                className="btn btn-warning"
                onClick={() => {
                  handleClickSummit();
                }}
              >
                Summit
              </button>
            </div>
          )}
          {isPreviewImage && (
            <Lightbox
              image={dataPreview.url}
              title={dataPreview.title}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuizUpdateQA;

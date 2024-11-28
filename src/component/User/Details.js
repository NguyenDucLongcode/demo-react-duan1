import { useParams, useLocation } from "react-router-dom";
import { getQuestionsById, postSummitAnswer } from "../../services/aipServices";
import { useEffect } from "react";
import _ from "lodash";
import "./Details.scss";
import Question from "./Question";
import { useState } from "react";
import ShowModalAnswer from "./ShowModalAnswer";
import RightContent from "./RightContent";
const Details = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  let { title } = location.state;
  const [dataQuestions, setDataQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showModalResults, setShowModalResults] = useState(false);
  const [dataModeResults, setDataModeResults] = useState({});
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  //
  const dataCheckBox = (answerId, questionId) => {
    let dataQuestionsColone = _.cloneDeep(dataQuestions);
    let question = dataQuestionsColone.find(
      (item) => +item.quizId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuestionsColone.findIndex(
      (item) => +item.quizId === +questionId
    );
    if (index > -1) {
      dataQuestionsColone[index] = question;
      setDataQuestions(dataQuestionsColone);
    }
  };
  // set data when receive from server
  const fetchQuestions = async () => {
    const res = await getQuestionsById(quizId);

    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let description,
            image = null;
          let answers = [];

          value.forEach((items, index) => {
            if (index === 0) {
              description = items.description;
              image = items.image;
            }
            answers.isSelected = false;
            answers.push(items.answers);
          });
          return { quizId: key, answers, description, image };
        })
        .value();
      data = data.map((item, index) => {
        return { ...item, questionId: index + 1 };
      });
      setDataQuestions(data);
    }
  };

  const handleCurrentQuestion = (questionId) => {
    setIndex(questionId);
  };

  const NextIndex = () => {
    if (index < dataQuestions.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  // set data sent to sever
  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuestions && dataQuestions.length > 0) {
      dataQuestions.forEach((item) => {
        let questionId = +item.quizId;
        let userAnswerId = [];
        item.answers.forEach((answer) => {
          if (answer.isSelected) {
            userAnswerId.push(+answer.id);
          }
        });
        answers.push({
          questionId: questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      let res = await postSummitAnswer(payload);
      console.log(res);
      if (res && res.EC === 0) {
        setDataModeResults({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setShowModalResults(true);
      } else {
        alert("An error occurred");
      }
    }
  };

  return (
    <div className="detail-question-container">
      <div className="question-left">
        <div className="title">
          Quiz {quizId}: {title}
        </div>
        <hr />
        <div className="question-content">
          <Question
            data={
              dataQuestions && dataQuestions.length > 0
                ? dataQuestions[index]
                : []
            }
            dataCheckBox={dataCheckBox}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => prevIndex()}>
            Prev
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              NextIndex();
            }}
          >
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="question-right">
        <RightContent
          data={dataQuestions}
          handleCurrentQuestion={handleCurrentQuestion}
          handleFinish={handleFinish}
        />
      </div>
      <ShowModalAnswer
        show={showModalResults}
        setShow={setShowModalResults}
        data={dataModeResults}
      />
    </div>
  );
};
export default Details;

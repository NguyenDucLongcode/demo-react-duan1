import { useParams, useLocation } from "react-router-dom";
import { getQuestionsById } from "../../services/aipServices";
import { useEffect } from "react";
import _ from "lodash";
import "./Details.scss";
import Question from "./Question";
import { useState } from "react";
const Details = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  let { title } = location.state;
  const [dataQuestions, setDataQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
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
      console.log("check raw", data);
      setDataQuestions(data);
    }
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
  return (
    <div className="question-container">
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
          <button className="btn btn-warning" onClick={() => prevIndex()}>
            Finish
          </button>
        </div>
      </div>
      <div className="question-right">count-down</div>
    </div>
  );
};
export default Details;

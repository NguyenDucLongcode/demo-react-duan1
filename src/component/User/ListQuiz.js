import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/aipServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{item.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${item.id}`, {
                      state: { title: item.description },
                    })
                  }
                >
                  Start Now
                </button>
              </div>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && (
        <div>You don't have any quiz... </div>
      )}
    </div>
  );
};

export default ListQuiz;

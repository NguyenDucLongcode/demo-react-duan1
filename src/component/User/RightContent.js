import CountDown from "./CountDown";
import "./RightContent.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useState } from "react";
const RightContent = (props) => {
  const { data } = props;
  const [onTimeUp, setOnTimeUp] = useState();

  const handleTimeUp = () => {
    props.handleFinish();
  };
  return (
    <div className="countDown-container">
      <div className="timer">
        <CountDown handleTimeUp={handleTimeUp} />
      </div>
      <PerfectScrollbar>
        <div className="showQuestion">
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <div
                  key={`${index}-question`}
                  className="question"
                  onClick={() => {
                    props.handleCurrentQuestion(index);
                  }}
                >
                  {item.questionId}
                </div>
              );
            })}
        </div>
      </PerfectScrollbar>
    </div>
  );
};
export default RightContent;

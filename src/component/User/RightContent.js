import CountDown from "./CountDown";
import "./RightContent.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
const RightContent = (props) => {
  const { data } = props;

  const handleTimeUp = () => {
    props.handleFinish();
  };

  const checkClass = (data) => {
    if (data.answers && data.answers.length > 0) {
      console.log(">> check data ", data.answers);
      let isAnswers = data.answers.find((a) => a.isSelected === true);
      console.log(">> isAnswer", isAnswers);
      if (isAnswers) {
        return "question selected";
      }
    }
    return "question";
  };
  return (
    <div className="countDown-container">
      <div className="timer">
        <CountDown handleTimeUp={handleTimeUp} />
      </div>
      <PerfectScrollbar>
        <div className="showQuestion">
          <div className="content">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div
                    key={`${index}-question`}
                    className={checkClass(item)}
                    onClick={() => {
                      props.handleCurrentQuestion(index);
                    }}
                  >
                    {item.questionId}
                  </div>
                );
              })}
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
};
export default RightContent;

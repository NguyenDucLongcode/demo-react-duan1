import Lightbox from "react-awesome-lightbox";
import { useState } from "react";
const Question = (props) => {
  const { data } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const dataQuestions = data.answers;
  const handleChange = (event, answerId, questionId) => {
    props.dataCheckBox(answerId, questionId);
  };
  return (
    <>
      <div className="img-content">
        {data.image && (
          <img
            onClick={() => setIsPreviewImage(true)}
            style={{ cursor: "pointer" }}
            src={`data:image/jpeg;base64,${data.image}`}
            alt="question"
          />
        )}
      </div>
      {isPreviewImage && (
        <Lightbox
          image={`data:image/jpeg;base64,${data.image}`}
          title={"Question Image"}
          onClose={() => setIsPreviewImage(false)}
        ></Lightbox>
      )}
      <div className="question">
        Question {data.questionId}: {data.description}?
      </div>
      <div className="answer">
        {dataQuestions && dataQuestions.length > 0 ? (
          dataQuestions.map((item, index) => (
            <div key={`${index}-question`} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={item.isSelected}
                onChange={(event) => {
                  handleChange(event, item.id, data.quizId);
                }}
              />
              <label className="form-check-label">
                <div className="a-child">{item.description}</div>
              </label>
            </div>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </>
  );
};
export default Question;

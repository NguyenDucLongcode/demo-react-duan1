const Question = (props) => {
  const { data } = props;
  const dataQuestions = data.answers;
  const handleChange = (event, answerId, questionId) => {
    props.dataCheckBox(answerId, questionId);
  };
  return (
    <>
      <div className="img-content">
        {data.image && (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="question" />
        )}
      </div>
      <div className="question">
        Question {data.quizId}: {data.description}?
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

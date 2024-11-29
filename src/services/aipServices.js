import axios from "../utils/axiosCustomize";
const potCreateUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};
const getListUsers = () => {
  return axios.get("api/v1/participant/all");
};
const putListUsers = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getUserWithPaginate = (page, limit_User) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit_User}`);
};
const postLogin = (email, password) => {
  return axios.post("api/v1/login", { email, password, delay: 3000 });
};
const postRegister = (email, password, username) => {
  return axios.post("api/v1/register", { email, password, username });
};
const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
const getQuestionsById = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
const postSummitAnswer = (data) => {
  return axios.post("api/v1/quiz-submit", { ...data });
};
const postAddQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("/api/v1/quiz", data);
};
const getQuizForSever = () => {
  return axios.get("api/v1/quiz/all");
};
const putQuizForSever = (id, description, name, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.put("api/v1/quiz", data);
};
const deleteQuizForServer = (QuizId) => {
  return axios.delete(`api/v1/quiz/${QuizId}`);
};
const postQuestionForServer = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("api/v1/question", data);
};
const postAnswerForQuestion = (description, correct_answer, question_id) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
const postAssignToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};
const getQuestionForServer = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const postUpsertQA = (data) => {
  return axios.post("api/v1/quiz-upsert-qa", { ...data });
};

const logOut = (email, refresh_token) => {
  return axios.post("api/v1/logout", {
    email,
    refresh_token,
  });
};
export {
  potCreateUser,
  getListUsers,
  putListUsers,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getQuestionsById,
  postSummitAnswer,
  postAddQuiz,
  getQuizForSever,
  putQuizForSever,
  deleteQuizForServer,
  postQuestionForServer,
  postAnswerForQuestion,
  postAssignToUser,
  getQuestionForServer,
  postUpsertQA,
  logOut,
  //... other APIs
};

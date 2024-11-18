import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/aipServices";
import { toast } from "react-toastify";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    // validate input
    if (!email || !password || !userName) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    // call Api
    let data = await postRegister(email, password, userName);
    console.log(data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  let inputPassword = document.querySelector("#password");
  const handleShowHidePassword = () => {
    if (inputPassword) {
      inputPassword.type =
        inputPassword.type === "password" ? "text" : "password";
      setShowPassword(!showPassword);
    }
  };
  return (
    <div className="register__container">
      <div className="content">
        <div className="title">Register</div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <i
            className="icon-show"
            onClick={() => {
              handleShowHidePassword();
            }}
          >
            {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
          </i>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            value={userName}
          ></input>
        </div>
        <div>
          <button
            className="btn btn-primary col-4"
            onClick={() => {
              handleSubmit();
            }}
          >
            Register
          </button>
        </div>

        <div>
          <span>You have account?</span>
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </div>
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Home
        </span>
        <p></p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};
export default Register;

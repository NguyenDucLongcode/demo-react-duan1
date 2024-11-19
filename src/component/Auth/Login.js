import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/aipServices";
import { toast } from "react-toastify";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      navigate("/");
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
    <div className="login__container">
      <div className="content">
        <div className="title">Welcome</div>
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
            id="password"
            type="password"
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
        </div>
        <span>Forgot password?</span>
        <div>
          <button
            className="btn btn-primary col-4"
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </button>
        </div>
        <div>
          <span>Don't you have account?</span>{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
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
export default Login;

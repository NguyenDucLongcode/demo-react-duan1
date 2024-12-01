import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/aipServices";
import { doLogOut } from "../../redux/action/userAction";
import Languages from "./Languages";
import Profile from "./Profile";
import { useState } from "react";
const Header = () => {
  //stare react
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);

  // state redux
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  // navigate to link
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogOut = async () => {
    let res = await logOut(account.email, account.refresh_token);
    console.log(res);
    if (res && res.EC === 0) {
      // reset data redux
      dispatch(doLogOut());
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  };
  return (
    <Nav className="header-container justify-content-between py-2 px-5">
      <Nav className="header-content">
        <Nav.Item>
          <Link to="/" className="nav-link fs-5 text-dark">
            King Dragon
          </Link>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admins" className="nav-link">
            Admins
          </NavLink>
        </Nav.Item>
      </Nav>
      <Nav className="header-btn">
        {!isAuthenticated ? (
          <>
            <button
              className="btn login"
              onClick={() => {
                handleLogin();
              }}
            >
              Loin
            </button>
            <button
              className="btn signup"
              onClick={() => {
                handleRegister();
              }}
            >
              Signup
            </button>
          </>
        ) : (
          <>
            <NavDropdown title="Setting" id="nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  setIsShowModalProfile(true);
                }}
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  handleLogOut();
                }}
              >
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </>
        )}
        <Languages />
      </Nav>
      <Profile show={isShowModalProfile} setShow={setIsShowModalProfile} />
    </Nav>
  );
};

export default Header;

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/aipServices";
import { doLogOut } from "../../redux/action/userAction";
import Languages from "./Languages";
const Header = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item
                href="#logout"
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
    </Nav>
  );
};

export default Header;

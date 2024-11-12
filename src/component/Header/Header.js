import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link } from "react-router-dom";
const Header = () => {
  //   const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  // onSelect={handleSelect}

  return (
    <Nav className="justify-content-evenly  bg-light  py-2 ">
      <Nav>
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
      <NavDropdown title="Setting" id="nav-dropdown">
        <NavDropdown.Item href="#login">Log in</NavDropdown.Item>
        <NavDropdown.Item href="#logout">Log out</NavDropdown.Item>

        <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default Header;

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
const Header = () => {
  //   const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  // onSelect={handleSelect}

  return (
    <Nav className="justify-content-evenly bg-light  py-2">
      <Nav>
        <Nav.Item>
          <Link to="/home" className="nav-link">
            King Dragon
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/admins" className="nav-link">
            Admins
          </Link>
        </Nav.Item>
      </Nav>
      <NavDropdown title="Setting" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1" href="#login">
          Log in
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2" href="#logout">
          Log out
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4" href="#profile">
          Profile
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default Header;

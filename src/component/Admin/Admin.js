import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Languages from "../Header/Languages";
const Admin = (props) => {
  const [collapsed, setcollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <div>
            <FaBars
              className="header-left 14
              4"
              onClick={() => {
                setcollapsed(!collapsed);
              }}
            />
          </div>
          <div className="header-right">
            <NavDropdown title="Setting" id="nav-dropdown">
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#logout">Log out</NavDropdown.Item>
            </NavDropdown>
            <Languages />
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;

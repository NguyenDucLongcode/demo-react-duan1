import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../acsets/bg-sidebar.jpg";
import { Link } from "react-router-dom";
const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <Sidebar
        className="sidebar-container"
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <Sidebar>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "white",
            }}
          >
            {/* {collapsed? : } */}
            <span> King Dragon</span>
          </div>
          <hr />
        </Sidebar>
        <Sidebar>
          <Menu iconShape="circle">
            <MenuItem
              component={<Link to="/admins" />}
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">New</span>}
            >
              Dashboard
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">3</span>}
              icon={<FaRegLaughWink />}
            >
              <MenuItem component={<Link to="manager-users" />}>
                Quản Lý User
              </MenuItem>
              <MenuItem> Quản Lý Bào Quiz</MenuItem>
              <MenuItem> Quản Lý Câu Hỏi</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>

        <Sidebar style={{ textAlign: "center" }} className="sidebar-footer">
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                viewSource
              </span>
            </a>
          </div>
        </Sidebar>
      </Sidebar>
    </>
  );
};
export default SideBar;

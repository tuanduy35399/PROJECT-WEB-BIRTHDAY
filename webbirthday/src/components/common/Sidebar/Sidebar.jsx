import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../../context/AuthContext"; // Import useAuth

const allMenuItems = [
  { to: "/users", icon: <CgProfile color="black" />, label: "Quản lý User" },
  { to: "/cards", icon: <TbCards color="black" />, label: "Quản lý thiệp" },
  { to: "/templates", icon: <BiCategory color="black" />, label: "Quản lý Template" },
];

const Sidebar = ({ open, setOpen }) => {
  const { user } = useAuth(); // Lấy thông tin user

  //Lọc ra các menu item được phép hiển thị
  const visibleMenuItems = allMenuItems.filter(item => {
    // User và Admin đều thấy "Quản lý thiệp"
    if (item.to === "/cards") return true;
    // Chỉ Admin mới thấy các mục còn lại
    if (user && user.isAdmin) return true;
    
    return false;
  });

  return (
    <div className={`${styles.sidebar} ${open ? styles.sidebarOpen : styles.sidebarCollapsed}`}>
      {/* Toggle */}
      <div className={styles.sidebarHeader}>
        <button
          className={`${styles.toggleBtn} ${open ? styles.toggleBtnShifted : ""}`}
          onClick={() => setOpen(!open)}
        >
          <FaBars />
        </button>
      </div>

      {/* Menu items */}
      <ul className={styles.menuList}>
        {/*Render danh sách đã được lọc */}
        {visibleMenuItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.activeLink : ""}`
              }
            >
              {icon}
              <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
                {label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import styles from "./Sidebar.module.css";

const menuItems = [
  { to: "/users", icon: <CgProfile color="black" />, label: "Cá nhân" },
  { to: "/cards", icon: <TbCards color="black" />, label: "Quản lý thiệp" },
  { to: "/edit", icon: <MdEdit color="black" />, label: "Chỉnh sửa" },
  { to: "/templates", icon: <BiCategory color="black" />, label: "Quản lý Template" },
];

const Sidebar = ({ open, setOpen }) => {
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
        {menuItems.map(({ to, icon, label }) => (
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

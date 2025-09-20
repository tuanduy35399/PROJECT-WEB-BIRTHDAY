import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import styles from "./Sidebar.module.css";

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
        <li className={styles.menuItem}>
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            <CgProfile color="black" />
            <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
              Cá nhân
            </span>
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink 
            to="/cards" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            <TbCards color="black" />
            <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
              Quản lý thiệp
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

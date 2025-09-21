import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import styles from "./Sidebar.module.css";
import { useState } from "react";
const Sidebar = ({ open, setOpen }) => {
  const [isActive, setActive] = useState("/home")
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
        <li className={`${styles.menuItem} ${isActive === "/home" ? styles.activeLink : ""}`}
          onClick={() => setActive("/home")
          }>
          <NavLink to="/home" className={styles.menuLink}>
            <CgProfile color="black" />
            <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
              Cá nhân
            </span>
          </NavLink>
        </li>
        <li  className={`${styles.menuItem} ${isActive === "/cards" ? styles.activeLink : ""}`}
            onClick={() => setActive("/cards")
            }>
          <NavLink to="/cards" className={styles.menuLink} >
            <TbCards color="black" />
            <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
              Quản lý thiệp
            </span>
          </NavLink>
        </li>
        <li className={`${styles.menuItem} ${isActive === "/edit" ? styles.activeLink : ""}`}
            onClick={() => setActive("/edit")
            }>
          <NavLink to="/edit" className={styles.menuLink} >
            <MdEdit color="black" />
            <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
              Chỉnh sửa
            </span>
          </NavLink>
        </li>
        {/* 👇 Thêm menu mới */}
        <li className={`${styles.menuItem} ${isActive === "/templates" ? styles.activeLink : ""}`}
            onClick={() => setActive("/templates")
            }>
          <NavLink to="/templates" className={styles.menuLink}>
            <BiCategory color="black" />
            <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
              Quản lý Template
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

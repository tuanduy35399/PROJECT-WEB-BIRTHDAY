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
  const [isActive, setActive] = useState("/users")
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
  <li>
    <NavLink
      to="/users"
      className={({ isActive }) =>
        `${styles.menuItem} ${isActive ? styles.activeLink : ""}`
      }
    >
      <CgProfile color="black" />
      <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
        Cá nhân
      </span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/cards"
      className={({ isActive }) =>
        `${styles.menuItem} ${isActive ? styles.activeLink : ""}`
      }
    >
      <TbCards color="black" />
      <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
        Quản lý thiệp
      </span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/edit"
      className={({ isActive }) =>
        `${styles.menuItem} ${isActive ? styles.activeLink : ""}`
      }
    >
      <MdEdit color="black" />
      <span className={`${styles.menuText} ${!open ? styles.sidebarCollapsedText : ""}`}>
        Chỉnh sửa
      </span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/templates"
      className={({ isActive }) =>
        `${styles.menuItem} ${isActive ? styles.activeLink : ""}`
      }
    >
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

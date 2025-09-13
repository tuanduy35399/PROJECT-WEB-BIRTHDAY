// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import "./Sidebar.css";

const Sidebar = ({ open, setOpen }) => {
  return (
    <div className={`sidebar ${open ? "open" : "collapsed"}`}>
      {/* Toggle */}
      <div className="sidebar-header">
        <button
          className={`toggle-btn ${open ? "shifted" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <FaBars />
        </button>
      </div>

      {/* Menu items */}
      <ul>
        <li>
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              isActive ? "active-link" : ""
            }
          >
            <CgProfile color = "black"/>
            {open && <span className="menu-text">Cá nhân</span>}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/cards" 
            className={({ isActive }) => 
              isActive ? "active-link" : ""
            }
          >
            <TbCards color="black"/>
            {open && <span className="menu-text">Quản lý thiệp</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

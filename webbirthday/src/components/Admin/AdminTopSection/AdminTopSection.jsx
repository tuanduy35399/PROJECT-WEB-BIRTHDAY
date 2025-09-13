// src/components/Admin/AdminTopSection/AdminTopSection.jsx
import React from "react";
import "./AdminTopSection.css";
import { FaSearch } from "react-icons/fa";
const AdminTopSection = () => {
  return (
    <div className="admin-top-section">
            <h1 className="admin-title">ACCOUNTS</h1>
            <div className="top-actions">
                {/* Search bar */}
                <div className="search-bar">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search" />
                </div>
        </div>
    </div>
  );
};

export default AdminTopSection;

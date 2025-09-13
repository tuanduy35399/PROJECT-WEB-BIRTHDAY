// src/components/Admin/Admin.jsx
import React from "react";
import AdminTopSection from "./AdminTopSection/AdminTopSection";
import AdminBottomSection from "./AdminBottomSection/AdminBottomSection";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <AdminTopSection />
      <AdminBottomSection />
    </div>
  );
};

export default Admin;

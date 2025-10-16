// src/components/Admin/Admin.jsx
import React, { useState } from "react";
import AdminTopSection from "./AdminTopSection/AdminTopSection";
import AdminBottomSection from "./AdminBottomSection/AdminBottomSection";
import "./Admin.module.css";

const Admin = () => {
     const [searchTerm, setSearchTerm] = useState("");
    
  return (
    <div className="admin-container">
      <AdminTopSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AdminBottomSection searchTerm={searchTerm} />
    </div>
  );
};

export default Admin;

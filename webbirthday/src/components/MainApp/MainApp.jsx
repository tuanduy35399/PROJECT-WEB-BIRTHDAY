import styles from "./MainApp.module.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Admin from "../Admin/Admin.jsx";
import CardManager from "../CardManager/CardManager.jsx";
<<<<<<< HEAD

import EditPage from "../EditPage/EditPage.jsx";
=======
import EditPage from "../editpage/EditPage.jsx";
import TemplateManager from "../Template/TemplateManager.jsx"; // 

>>>>>>> refs/remotes/origin/main
function MainApp() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <Router>
      <div className="App">
        {/* Sidebar mặc định */}
        <Sidebar open={openSideBar} setOpen={setOpenSideBar} />

        {/* Main content */}
        <div className={`${styles.main} ${openSideBar ? styles.mainShifted : ""}`}>
          <Routes>
            {/* Auto redirect khi vào web → /cards */}
            <Route path="/" element={<Navigate to="/cards" replace />} />

            <Route path="/home" element={<Admin />} />
            <Route path="/cards" element={<CardManager />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/templates" element={<TemplateManager />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default MainApp;

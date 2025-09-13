
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Admin from "./components/Admin/Admin.jsx";

import CardManager from "./components/CardManager/CardManager.jsx";

function App() {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <Router>
      <div className="app">
        {/* Sidebar mặc định */}
        <Sidebar open={openSideBar} setOpen={setOpenSideBar} />

        {/* Main content */}
        <div className={`main ${openSideBar ? "shifted" : ""}`}>
          <Routes>
            {/* Auto redirect khi vào web → /cards */}
            <Route path="/" element={<Navigate to="/cards" replace />} />

            <Route path="/home" element={<Admin />} />
            <Route path="/cards" element={<CardManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

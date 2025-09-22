import styles from "./MainApp.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import Sidebar from "../common/Sidebar/Sidebar.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import CardManager from "../pages/CardManager/CardManager.jsx";
import TemplateManager from "../Template/TemplateManager.jsx";
import EditPage from "../pages/EditPage/EditPage.jsx";

function MainLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="App">
      <Sidebar open={openSideBar} setOpen={setOpenSideBar} />
      <div className={`${styles.main} ${openSideBar ? styles.mainShifted : ""}`}>
        <Outlet />
      </div>
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/cards" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/users" element={<Admin />} />
          <Route path="/cards" element={<CardManager />} />
          <Route path="/templates" element={<TemplateManager />} />
        </Route>
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default MainApp;

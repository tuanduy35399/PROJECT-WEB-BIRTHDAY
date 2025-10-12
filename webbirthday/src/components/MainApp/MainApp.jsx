import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import styles from "./MainApp.module.css";
import Sidebar from "../common/Sidebar/Sidebar.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import CardManager from "../pages/CardManager/CardManager.jsx";
import TemplateManager from "../Template/TemplateManager.jsx";
import EditPage from "../pages/EditPage/EditPage.jsx";
import Login from "../Login/Login.jsx";
import { ProtectedRoute, AdminRoute } from "../common/ProtectedRoute";

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
        <Route path="/login" element={<Login />} />

        {/* Các Route cần đăng nhập */}
        <Route element={<ProtectedRoute />}>
          {/* Các trang có layout chung */}
          <Route element={<MainLayout />}>
            <Route path="/cards" element={<CardManager />} />
            {/* Các trang chỉ dành cho Admin */}
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<Admin />} />
              <Route path="/templates" element={<TemplateManager />} />
            </Route>
          </Route>

          {/* Trang edit dành cho Admin */}
          <Route path="/edit/:mode/:id" element={<EditPage />} />
          
          {/* ✨ SỬA LỖI: Thêm Route còn thiếu cho chế độ xem của User */}
          <Route path="/view/card/:id" element={<EditPage viewOnly={true} />} />
        </Route>

        {/* Route mặc định */}
        <Route path="/" element={<Navigate to="/cards" replace />} />
      </Routes>
    </Router>
  );
}

export default MainApp;


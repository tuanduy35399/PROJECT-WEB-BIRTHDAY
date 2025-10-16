import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Component này chỉ cho phép user đã đăng nhập truy cập
export const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // Nếu đã đăng nhập, hiển thị component con
};

// Component này chỉ cho phép user có role là 'admin' truy cập
export const AdminRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // SỬA LỖI: Kiểm tra "user.isAdmin" thay vì "user.role"
  if (!user.isAdmin) {
    // Nếu không phải admin, chuyển hướng về trang card
    return <Navigate to="/cards" replace />;
  }
    const token = localStorage.getItem("token");
    if (!token) {
    return <Navigate to="/login" replace />;
    }
  return <Outlet />; // Nếu là admin, hiển thị component con
};

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Chỉ cho phép user đã login truy cập
export const ProtectedRoute = () => {
  const { user } = useAuth();

  // Chờ user load xong
  if (user === undefined) return null; // hoặc render spinner/loading

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

// Chỉ cho phép admin truy cập
export const AdminRoute = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  if (user === undefined) return null;

  if (!user || !token) return <Navigate to="/login" replace />;

  if (!user.isAdmin) return <Navigate to="/cards" replace />;

  return <Outlet />;
};

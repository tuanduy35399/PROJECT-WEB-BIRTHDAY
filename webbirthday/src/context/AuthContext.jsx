import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Khi người dùng đăng nhập, bạn sẽ lưu object user vào đây
  // Ví dụ user object: { _id: "...", username: "testuser", role: "user" }
  // hoặc { _id: "...", username: "admin", role: "admin" }
  const [user, setUser] = useState(() => {
    // Lấy user từ localStorage nếu có, để giữ trạng thái đăng nhập khi refresh trang
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để dễ dàng sử dụng context
export const useAuth = () => {
  return useContext(AuthContext);
};
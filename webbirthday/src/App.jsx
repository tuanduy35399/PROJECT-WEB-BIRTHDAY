import React, { useState } from "react";
import Login from "./components/Login/Login.jsx";
import MainApp from "./components/MainApp/MainApp.jsx";
import "react-toastify/dist/ReactToastify.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer } from "react-toastify";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") // ✅ giữ login khi reload
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? <MainApp /> : <Login onLogin={handleLogin} />}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

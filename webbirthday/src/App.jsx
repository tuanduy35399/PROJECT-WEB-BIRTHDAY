import React, { useState } from "react";
import Login from "./components/Login/Login.jsx";
import MainApp from "./components/MainApp/MainApp.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") // ✅ giữ login khi reload
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <MainApp />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

import React, { useState } from "react";
import Login from "./components/Login/Login.jsx";
import MainApp from "./components/MainApp/MainApp.jsx";
import './App.css';
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

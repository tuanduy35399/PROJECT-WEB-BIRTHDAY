import React, { useState } from "react";
import Login from "./components/Login/Login.jsx";
import MainApp from "./components/MainApp/MainApp.jsx";
import "react-toastify/dist/ReactToastify.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext.jsx";
export default function App() {
    const { user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") // ✅ giữ login khi reload
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

   return (
     <>
       {user ? <MainApp /> : <Login />}
       <ToastContainer position="top-right" autoClose={3000} />
     </>
   );
}

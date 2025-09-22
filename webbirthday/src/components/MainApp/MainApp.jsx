import styles from "./MainApp.module.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Admin from "../Admin/Admin.jsx";
import CardManager from "../CardManager/CardManager.jsx";
import TemplateManager from "../Template/TemplateManager.jsx"; // 
import EditPage from "../EditPage/EditPage.jsx";


function MainLayout({children}){
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="App">
      <Sidebar open={openSideBar} setOpen={setOpenSideBar}></Sidebar>
      <div className={`${styles.main} ${openSideBar ? styles.mainShifted : ""}`}>
        <Outlet></Outlet>
      </div>
    </div>


  );
}




function MainApp() { 
  return (
    <Router>


        {/* Main content */}

          <Routes>
            {/* Auto redirect khi vào web → /cards */}
            <Route path="/" element={<Navigate to="/cards" replace />} />
            <Route
              element={
                <MainLayout>                    
                </MainLayout>
              }
            
            >

                <Route path="/home" element={<Admin />} />
                <Route path="/cards" element={<CardManager />} />
                <Route path="/templates" element={<TemplateManager />} /> 




            </Route>

            <Route path="/edit" element={<EditPage />} />

          </Routes>


    </Router>
  );
}

export default MainApp;

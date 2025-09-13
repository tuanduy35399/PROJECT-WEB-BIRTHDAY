// src/components/CardManager.jsx
import React from "react";
import TopSection from "./TopSection/TopSection";
import BottomSection from "./BottomSection/BottomSection";
import './CardManager.css'
const CardManager = () => {
  return (
    <div className="main-content">
      <TopSection />
      <BottomSection />
    </div>
  );
};

export default CardManager;

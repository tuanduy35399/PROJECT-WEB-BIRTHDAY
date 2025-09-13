// src/components/TopSection/TopSection.jsx
import React from "react";
import "./TopSection.css";
import bg  from "../../../assets/createbg2.jpg"
const TopSection = () => {
  return (
    <div className="top-section">
        <div className="contain-wrapper">
            <div>
                <h1 className="title">CARDS</h1>
                <button class="pill-btn">
                        + NEW
                </button>
            </div>
            <div className="img-container">
                <img src={bg}/>
            </div>
        </div>

    </div>
  );
};

export default TopSection;

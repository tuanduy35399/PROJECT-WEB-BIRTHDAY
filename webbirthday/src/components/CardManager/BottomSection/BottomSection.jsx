import React from "react";
import "./BottomSection.css";

// Mảng demo card
const cardsData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: "https://via.placeholder.com/300x150", // ảnh minh họa tạm
  title: `Card ${i + 1}`,
  date: "2025-09-13",
  creator: "User A",
}));

const BottomSection = () => {
  return (
    <div className="bottom-section">
      <h2 className="section-title">Recent</h2>
      <div className="grid-container">
        {cardsData.map((card) => (
          <div key={card.id} className="rect-card">
            <div className="card-top">
              <img src={card.image} alt={card.title} />
            </div>
            <div className="divider"></div>
            <div className="card-bottom">
              <p><strong>{card.title}</strong></p>
              <p>{card.date}</p>
              <p>{card.creator}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomSection;

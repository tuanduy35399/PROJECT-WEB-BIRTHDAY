import React from "react";
import styles from "./BottomSection.module.css";

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
    <div className={styles.bottomSection}>
      <h2 className={styles.sectionTitle}>Recent</h2>
      <div className={styles.gridContainer}>
        {cardsData.map((card) => (
          <div key={card.id} className={styles.rectCard}>
            <div className={styles.cardTop}>
              <img src={card.image} alt={card.title} />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.cardBottom}>
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

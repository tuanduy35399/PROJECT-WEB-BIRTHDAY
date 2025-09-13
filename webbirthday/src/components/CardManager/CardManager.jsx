import React from "react";
import TopSection from "./TopSection/TopSection";
import BottomSection from "./BottomSection/BottomSection";
import styles from "./CardManager.module.css";

const CardManager = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.topSection}>
        <TopSection />
      </div>
      <div className={styles.bottomSection}>
        <BottomSection />
      </div>
    </div>
  );
};

export default CardManager;

import React from "react";
import TopSection from "./TopSection/TopSection";
import BottomSection from "./BottomSection/BottomSection";
import styles from "./CardManager.module.css";

const CardManager = () => {
  return (
    <div className={styles.mainContent}>
      <TopSection />
      <BottomSection />
    </div>
  );
};

export default CardManager;

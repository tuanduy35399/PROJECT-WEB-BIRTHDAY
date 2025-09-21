import React from "react";
import TopSection from "./TemplateTopSection/TemplateTopSection.jsx";
import BottomSection from "./TemplateBottomSection/TemplateBottomSection.jsx";
import styles from "./TemplateManager.module.css";

const TemplateManager = () => {
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

export default TemplateManager;

import React, { useState } from "react";
import styles from "./TopSection.module.css";
import bg from "../../../assets/createbg2.jpg";
import { useNavigate } from "react-router-dom";

const TopSection = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
  const templates = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Template ${i + 1}`,
    img: `https://via.placeholder.com/200x120?text=Template+${i + 1}`,
  }));

  return (
    <div className={styles.topSection}>
      <div className={styles.containWrapper}>
        <div className={styles.imgContainer}>
          <h1 className={styles.title}>CARDS</h1>
          <button className={styles.pillBtn} onClick={() => setOpenDrawer(true)} >
            + NEW 
          </button>
        </div>
        {/* <div className={styles.imgContainer}>
          <img src={bg} alt="Top Illustration" />
        </div> */}
      </div>

      {/* Drawer */}
      <div className={`${styles.drawer} ${openDrawer ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHeader}>
          <h2>Choose a Template</h2>
          <button className={styles.closeBtn} onClick={() => setOpenDrawer(false)}>
            &times;
          </button>
        </div>
        <div className={`${styles.drawerBody} ${styles.horizontalScroll}`}>
          {templates.map((template) => (
            <div key={template.id} className={styles.templateCard}>
              <img src={template.img} alt={template.name} />
              <p>{template.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {openDrawer && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setOpenDrawer(false)}
        ></div>
      )}
    </div>
  );
};

export default TopSection;

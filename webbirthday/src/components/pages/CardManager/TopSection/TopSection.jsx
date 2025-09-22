import React, { useState } from "react";
import styles from "./TopSection.module.css";
import { useNavigate } from "react-router-dom";

const TopSection = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const templates = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Template ${i + 1}`,
    img: `https://via.placeholder.com/200x120?text=Template+${i + 1}`,
  }));

  const handleChooseTemplate = (template) => {
    setOpenDrawer(false);
    // điều hướng tới trang edit với template id
    navigate(`/edit?templateId=${template.id}`);
  };

  return (
    <div className={styles.topSection}>
      <div className={styles.containWrapper}>
        <h1 className={styles.title}>CARDS</h1>
        <button
          className={styles.pillBtn}
          onClick={() => setOpenDrawer(true)}
        >
          + NEW
        </button>
      </div>

      {/* Drawer */}
      <div
        className={`${styles.drawer} ${openDrawer ? styles.drawerOpen : ""}`}
      >
        <div className={styles.drawerHeader}>
          <h2>Choose a Template</h2>
          <button
            className={styles.closeBtn}
            onClick={() => setOpenDrawer(false)}
          >
            &times;
          </button>
        </div>
        <div className={`${styles.drawerBody} ${styles.horizontalScroll}`}>
          {templates.map((template) => (
            <div
              key={template.id}
              className={styles.templateCard}
              onClick={() => handleChooseTemplate(template)}
            >
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
        />
      )}
    </div>
  );
};

export default TopSection;

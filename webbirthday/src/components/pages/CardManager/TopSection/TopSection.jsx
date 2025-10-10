import React, { useEffect, useState } from "react";
import styles from "./TopSection.module.css";
import { useNavigate } from "react-router-dom";
import { getTemplates } from "../../../../services/templateService";
import { createCard } from "../../../../services/cardService";
import { toast } from "react-toastify";

const TopSection = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);


  const handleChooseTemplate = async (template) => {
  setOpenDrawer(false);

  try {
    navigate(`/edit/templates/${template._id}`);
  } catch (err) {
    toast.error("Không thể chuyển trang", err);
  }
};
  useEffect(() => {
      getTemplates()
        .then((res) => setTemplates(res.data))
        .catch((err) => toast.error("Không thể lấy Template", err));
    }, []);
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
              key={template._id}
              className={styles.templateCard}
              onClick={() => handleChooseTemplate(template)}
            >
              <img src={template.imgURL} alt={template.name} />
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

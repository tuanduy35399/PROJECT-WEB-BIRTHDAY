import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./TemplateBottomSection.module.css";
import { getTemplates } from "../../../services/templateService";

const TemplateBottomSection = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getTemplates()
      .then((res) => setTemplates(res.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  return (
    <div className={styles.bottomSection}>
      <h2 className={styles.sectionTitle}>All Templates</h2>
      <div className={styles.gridContainer}>
        {templates.map((template) => (
          <Link
            key={template._id}
            to={`/edit/${template._id}`} // 👈 dùng Link thay navigate
            className={styles.rectCard}
          >
            <div className={styles.cardTop}>
              <img
                src={
                  template.imgURL?.[0] ||
                  "https://via.placeholder.com/300x150?text=Template"
                }
                alt={template.name}
              />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.cardBottom}>
              <p>
                <strong>{template.name}</strong>
              </p>
              <p>{new Date(template.createdAt).toLocaleDateString()}</p>
              <p>{template.owner?.username || "Unknown"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TemplateBottomSection;
 
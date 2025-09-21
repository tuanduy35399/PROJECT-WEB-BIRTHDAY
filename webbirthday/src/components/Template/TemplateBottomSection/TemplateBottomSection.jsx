import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TemplateBottomSection.module.css";

const TemplateBottomSection = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/templates");
        setTemplates(res.data);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className={styles.TemplateBottomSection}>
      <h2 className={styles.sectionTitle}>All Templates</h2>
      <div className={styles.gridContainer}>
        {templates.map((template) => (
          <div key={template._id} className={styles.rectCard}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateBottomSection;

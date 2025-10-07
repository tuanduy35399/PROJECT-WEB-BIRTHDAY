import React, { useEffect, useState } from "react";
import styles from "./TemplateTopSection.module.css";
// import bg from "../../../assets/createbg2.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TemplateTopSection = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  // Lấy danh sách template từ backend
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
    <div className={styles.TemplateTopSection}>
      <div className={styles.containWrapper}>
        {/* className={styles.imgContainer} */}
        <div > 
          <h1 className={styles.title}>TEMPLATES</h1>
          <button
            className={styles.pillBtn}
            onClick={() => navigate("/edit/templates/blank")}
          >
            + NEW
          </button>
        </div>
        {/* <div >
          <img src={bg} alt="Top Illustration" />
        </div> */}
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
              onClick={() => {
                setOpenDrawer(false);
                navigate(`/cards/new?template=${template._id}`); // link đến page tạo card mới từ template
              }}
            >
              <img
                src={
                  template.imgURL?.[0] ||
                  "https://via.placeholder.com/200x120?text=Template"
                }
                alt={template.name}
              />
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

export default TemplateTopSection;

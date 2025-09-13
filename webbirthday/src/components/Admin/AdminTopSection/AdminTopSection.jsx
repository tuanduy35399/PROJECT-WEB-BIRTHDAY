import React from "react";
import styles from "./AdminTopSection.module.css";
import { FaSearch } from "react-icons/fa";

const AdminTopSection = () => {
  return (
    <div className={styles.adminTopSection}>
      <h1 className={styles.adminTitle}>ACCOUNTS</h1>
      <div className={styles.topActions}>
        {/* Search bar */}
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>
  );
};

export default AdminTopSection;

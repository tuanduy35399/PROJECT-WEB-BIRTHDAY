    import React, { useState } from "react";
    import styles from "./AdminTopSection.module.css";
    import { FaSearch } from "react-icons/fa";
    import ModalCreateUser from "../ModalCreateUser/ModalCreateUser";

    const AdminTopSection = () => {
        const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    return (
        <div className={styles.adminTopSection}>
        <div className={styles.leftSection}>
            <h1 className={styles.adminTitle}>ACCOUNTS</h1>
            <button className={styles.pillBtn} onClick={() => setShowModalCreateUser(true)}>
                New User
            </button>
        </div>

        <div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
            />
        </div>
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

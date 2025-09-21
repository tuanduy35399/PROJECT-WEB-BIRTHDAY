import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminBottomSection.module.css";
import UserDetailDrawer from "../UserDetailDrawer/UserDetailDrawer";

const AdminBottomSection = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Lấy danh sách user từ DB
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setAccounts(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Toggle trạng thái hoạt động (isActive)
  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${id}`, {
        isActive: !currentStatus,
      });

      setAccounts(
        accounts.map((acc) =>
          acc._id === id ? { ...acc, isActive: res.data.user.isActive } : acc
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className={styles.adminBottomSection}>
      <table className={styles.accountTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Last Access</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc._id} onDoubleClick={() => setSelectedUser(acc)}>
              <td>{acc.username}</td>
              <td>{acc.lastAccess || "N/A"}</td>
              <td>
                <input
                  type="checkbox"
                  checked={acc.isActive ?? true}
                  onChange={() => toggleStatus(acc._id, acc.isActive)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserDetailDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default AdminBottomSection;

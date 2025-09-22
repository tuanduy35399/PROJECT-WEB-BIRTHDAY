import React, { useEffect, useState } from "react";
import styles from "./AdminBottomSection.module.css";
import UserDetailDrawer from "../UserDetailDrawer/UserDetailDrawer";
import { getUsers, updateUserStatus } from "../../../../services/userService";

const AdminBottomSection = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setAccounts(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedUser = await updateUserStatus(id, !currentStatus);
      setAccounts((prev) =>
        prev.map((acc) =>
          acc._id === id ? { ...acc, isActive: updatedUser.isActive } : acc
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

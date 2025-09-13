import React, { useState } from "react";
import "./AdminBottomSection.css";
import UserDetailDrawer from "../UserDetailDrawer/UserDetailDrawer";

const AdminBottomSection = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      username: "user01",
      lastAccess: "2025-09-01",
      status: true,
      createdAt: "2025-01-01",
      createdBy: "Admin A",
      cards: ["Card A1", "Card A2"],
    },
    {
      id: 2,
      username: "user02",
      lastAccess: "2025-09-10",
      status: false,
      createdAt: "2025-02-15",
      createdBy: "Admin B",
      cards: ["Card B1"],
    },
    {
      id: 3,
      username: "user03",
      lastAccess: "2025-09-12",
      status: true,
      createdAt: "2025-03-20",
      createdBy: "Admin A",
      cards: ["Card C1", "Card C2", "Card C3"],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const toggleStatus = (id) => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === id ? { ...acc, status: !acc.status } : acc
      )
    );
  };

  return (
    <div className="admin-bottom-section">
      <table className="account-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Last Access</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.id} onDoubleClick={() => setSelectedUser(acc)}>
              <td>{acc.username}</td>
              <td>{acc.lastAccess}</td>
              <td>
                <input
                  type="checkbox"
                  checked={acc.status}
                  onChange={() => toggleStatus(acc.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Drawer hiển thị khi chọn user */}
      <UserDetailDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default AdminBottomSection;

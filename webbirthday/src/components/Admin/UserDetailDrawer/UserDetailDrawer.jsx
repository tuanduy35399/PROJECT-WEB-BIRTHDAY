// src/components/Admin/UserDetailDrawer/UserDetailDrawer.jsx
import React from "react";
import "./UserDetailDrawer.css";

const UserDetailDrawer = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div
        className="drawer"
        onClick={(e) => e.stopPropagation()} // tránh đóng khi click bên trong
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>User Detail</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Created At:</strong> {user.createdAt}</p>
        <p><strong>Created By:</strong> {user.createdBy}</p>
        <h3>Owned Cards</h3>
        <ul>
          {user.cards.map((card, i) => (
            <li key={i}>{card}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetailDrawer;

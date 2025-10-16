import React, { useEffect, useState } from "react";
import styles from "./UserDetailDrawer.module.css";
import { getCards, updateCard } from "../../../../services/cardService";
import { toast } from "react-toastify";
const UserDetailDrawer = ({ user, onClose }) => {
  if (!user) return null;

  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);

  // ✅ Lấy danh sách card
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await getCards();
        setCards(res.data);
      } catch (err) {
        toast.error("Không thể lấy danh sách thẻ");
      }
    };
    fetchCards();
  }, []);

  //  Các card user đang sở hữu
  const ownedCards = cards.filter((card) => {
    if (!card.owner) return false; // bỏ qua nếu không có owner
    if (typeof card.owner === "object") return card.owner._id === user._id; // populate
    return card.owner === user._id; // string id
  });

  // Các card chưa có owner
  const availableCards = cards.filter((card) => !card.owner);

  // Hàm xử lý khi lưu card mới
  const handleAddCard = async () => {
    if (!selectedCardId) {
      toast.info("Vui lòng chọn thẻ");
      return;
    }

    try {
      await updateCard(selectedCardId, { owner: user._id });
      toast.info("Gán card cho user thành công!");
      setShowAddCard(false);

      // cập nhật lại list
      const res = await getCards();
      setCards(res.data);
    } catch (err) {
      console.error("Error assigning card:", err);
      toast.error("Lỗi khi gán card!");
    }
  };

  return (
    <div className={styles.drawerOverlay} onClick={onClose}>
      <div
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()} // tránh đóng khi click bên trong
      >
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>

        <h2>User Detail</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(user.createdAt).toLocaleString()}
        </p>

        <h3>Owned Cards</h3>
        {ownedCards.length > 0 ? (
          <ul>
            {ownedCards.map((card) => (
              <li key={card._id} className={styles.ownedCardItem}>
                {card.cardName}
                <button
                  className={styles.removeCardBtn}
                  onClick={async () => {
                    try {
                      await updateCard(card._id, { owner: null });
                      toast.info("Đã gỡ card khỏi user!");
                      // Cập nhật lại list
                      const res = await getCards();
                      setCards(res.data);
                    } catch (err) {
                      console.error("Error removing card:", err);
                      toast.error("Lỗi khi gỡ card!");
                    }
                  }}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa sở hữu card nào.</p>
        )}

        {/* Nút thêm card */}
        {!showAddCard ? (
          <button
            onClick={() => setShowAddCard(true)}
            className={styles.addBtn}
          >
            ➕ Thêm Card
          </button>
        ) : (
          <div className={styles.addCardContainer}>
            <select
              value={selectedCardId}
              onChange={(e) => setSelectedCardId(e.target.value)}
              className={styles.selectBox}
            >
              <option value="">-- Chọn card --</option>
              {availableCards.map((card) => (
                <option key={card._id} value={card._id}>
                  {card.cardName}
                </option>
              ))}
            </select>
            <button onClick={handleAddCard} className={styles.saveBtn}>
              Lưu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailDrawer;

import React, { useEffect, useState } from "react";
import styles from "./BottomSection.module.css";
import { getCards, updateCard } from "../../../../services/cardService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";

const BottomSection = () => {
  const [cardsData, setCardsData] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchCards = async () => {
      try {
        const res = await getCards();
        let displayCards = [];
        if (user.isAdmin) {
          displayCards = res.data;
        } else {
          displayCards = res.data.filter(
            (card) => card.owner?._id === user._id && !card.isEditable
          );
        }
        setCardsData(displayCards);
      } catch (err) {
        toast.error("Không thể lấy Card");
        console.error(err);
      }
    };

    fetchCards();
  }, [user]);

  const toggleEditable = async (cardId, newState) => {
    try {
      await updateCard(cardId, { isEditable: newState });
      setCardsData((prev) =>
        prev.map((card) =>
          card._id === cardId ? { ...card, isEditable: newState } : card
        )
      );
      toast.success(
        `Card đã được đánh dấu là "${
          newState ? "Chưa hoàn chỉnh" : "Đã hoàn chỉnh"
        }"`
      );
    } catch (err) {
      toast.error("Không thể cập nhật trạng thái chỉnh sửa");
      console.error(err);
    }
  };

  const CardContent = ({ card }) => (
    <>
      <div className={styles.cardTop}>
        <img
          src={card.imgURL?.[0] || "https://via.placeholder.com/300x150"}
          alt={card.cardName}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.cardBottom}>
        <p>
          <strong>{card.cardName}</strong>
        </p>
        <p>{new Date(card.createdAt).toLocaleDateString()}</p>
        <p>{card.owner?.username || "Chưa có chủ"}</p>

        {user.isAdmin && (
          <button
            className={`${styles.editableBtn} ${
              card.isEditable ? styles.notComplete : styles.completed
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Ngăn event click bubble lên div cha
              toggleEditable(card._id, !card.isEditable);
            }}
          >
            {card.isEditable ? "Chưa hoàn chỉnh" : "Đã hoàn chỉnh"}
          </button>
        )}
      </div>
    </>
  );

  const handleCardClick = (card) => {
    // User thường vẫn có thể click vào card đã hoàn thiện
    if (user.isAdmin) {
      if (!card.isEditable) return; // Admin chỉ click card chưa hoàn thiện
      navigate(`/edit/cards/${card._id}`);
    } else {
      // User thường → redirect sang trang view-only
      navigate(`/view/cards/${card._id}`);
    }
  };

  return (
    <div className={styles.bottomSection}>
      <h2 className={styles.sectionTitle}>
        {user?.isAdmin ? "Recent Cards" : "My Cards"}
      </h2>
      <div className={styles.gridContainer}>
        {cardsData.length === 0 ? (
          <p className={styles.noCardsMessage}>
            Bạn chưa được cấp quyền truy cập card nào.
          </p>
        ) : (
          cardsData.map((card) => {
            const isLocked = !card.isEditable && user.isAdmin;// dùng trực tiếp để quyết định UI

            return (
              <div
                key={card._id}
                className={`${styles.rectCard} ${
                  isLocked ? styles.completedCard : ""
                }`}
                style={{
                  opacity: isLocked ? 0.5 : 1,
                  cursor: isLocked ? "not-allowed" : "pointer",
                }}
                onClick={() => handleCardClick(card)}
              >
                <CardContent card={card} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BottomSection;

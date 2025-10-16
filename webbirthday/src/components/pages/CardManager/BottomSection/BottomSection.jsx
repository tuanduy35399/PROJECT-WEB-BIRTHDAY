import React, { useEffect, useState } from "react";
import styles from "./BottomSection.module.css";
import { getCards, updateCard } from "../../../../services/cardService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";

const BottomSection = () => {
  const [cardsData, setCardsData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchCards = async () => {
      try {
        const res = await getCards();
        let displayCards = [];
        if (user.isAdmin) {
          displayCards = res.data;
        } else {
          // Non-admin chỉ thấy card đã hoàn chỉnh
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
              toggleEditable(card._id, !card.isEditable);
            }}
          >
            {card.isEditable ? "Chưa hoàn chỉnh" : "Đã hoàn chỉnh"}
          </button>
        )}
      </div>
    </>
  );

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
            const isLocked = !card.isEditable; // card đã hoàn chỉnh

            const handleCardClick = () => {
              if (isLocked && !user.isAdmin) return; // non-admin không click
              if (isLocked && user.isAdmin) return; // admin click card đã hoàn chỉnh → không redirect
              // Nếu card chưa hoàn chỉnh, admin click → redirect
              // Trường hợp redirect bạn có thể dùng Link hoặc navigate
            };

            return (
              <div
                key={card._id}
                className={`${styles.rectCard} ${
                  isLocked ? styles.completedCard : ""
                }`}
                style={{
                  opacity: isLocked && !card.isEditable ? 0.5 : 1,
                  cursor: isLocked ? "not-allowed" : "pointer",
                }}
                onClick={handleCardClick}
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

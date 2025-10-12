import React, { useEffect, useState } from "react";
import styles from "./BottomSection.module.css";
import { getCards } from "../../../../services/cardService";
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
          displayCards = res.data.filter(
            (card) => card.owner?._id === user._id
          );
        }
        setCardsData(displayCards);
      } catch (err) { 
        toast.error("Không thể lấy Card", err);
      }
    };
    fetchCards();
  }, [user]);

  // Component Card hiển thị nội dung
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
      </div>
    </>
  );

  return (
    <div className={styles.bottomSection}>
      <h2 className={styles.sectionTitle}>
        {user?.role === "admin" ? "Recent Cards" : "My Cards"}
      </h2>
      <div className={styles.gridContainer}>
        {cardsData.length === 0 ? (
          <p className={styles.noCardsMessage}>Bạn chưa được cấp quyền truy cập card nào.</p>
        ) : (
          cardsData.map((card) => {
            if (user.isAdmin) {
              return (
                <Link
                  key={card._id}
                  to={`/edit/cards/${card._id}`}
                  className={styles.rectCard}
                >
                  <CardContent card={card} />
                </Link>
              );
            }
            return (
              <Link
                key={card._id}
                to={`/view/card/${card._id}`}
                className={styles.rectCard}
              >
                <CardContent card={card} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BottomSection;


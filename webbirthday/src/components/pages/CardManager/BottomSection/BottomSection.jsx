import React, { useEffect, useState } from "react";
import styles from "./BottomSection.module.css";
import { getCards } from "../../../../services/cardService";
import { Link } from "react-router-dom";

const BottomSection = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await getCards();
        setCardsData(res.data);
        console.log(res);
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className={styles.bottomSection}> 
      <h2 className={styles.sectionTitle}>Recent</h2>
      <div className={styles.gridContainer}>
        {cardsData.map((card) => (
             <Link
                key={card._id}
                to={`/edit/cards/${card._id}`} // 👈 dùng Link thay navigate
                className={styles.rectCard}
            >
          <div key={card._id} className={styles.rectCard}>
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
              <p>{card.owner?.username || "Unknown"}</p>
              <p>{card.cardDESC}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomSection;

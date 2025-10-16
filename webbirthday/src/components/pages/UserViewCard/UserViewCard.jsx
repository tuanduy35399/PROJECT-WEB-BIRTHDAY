import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById } from "../../services/cardService"; // service fetch card theo id
import WorkSpace from "../workspace/WorkSpace";

const UserViewCard = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await getCardById(id);
        setCardData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCard();
  }, [id]);

  if (!cardData) return <p>Loading...</p>;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WorkSpace fabricData={cardData.fabricJson} viewOnly={true} />
    </div>
  );
};

export default UserViewCard;

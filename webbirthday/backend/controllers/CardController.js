import Card from "../models/Card.js";

const CardController = {
  // [GET] /api/cards
  getAll: async (req, res) => {
    try {
      // lấy đúng field trong schema
      const cards = await Card.find(
        {},
        "cardName imgURL cardDESC owner createdAt"
      );
      res.json(cards);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // [GET] /api/cards/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const card = await Card.findById(id).populate("owner", "username");
      if (!card) return res.status(404).json({ message: "Card not found" });

      res.json(card);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // [POST] /api/cards
  create: async (req, res) => {
    try {
      const { cardID, cardName, imgURL, cardDESC, fabricEdit, owner } =
        req.body;

      const newCard = new Card({
        cardID,
        cardName,
        imgURL,
        cardDESC,
        fabricEdit,
        owner,
      });
      await newCard.save();

      res.status(201).json({ message: "Card created", card: newCard });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // [PUT] /api/cards/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedCard = await Card.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedCard)
        return res.status(404).json({ message: "Card not found" });

      res.json({ message: "Card updated", card: updatedCard });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default CardController;

// controllers/CardController.js
import Card from "../models/Card.js";
import { processFabricEditImages } from "../utils/processFabricEdit.js";
import { uploadFabricJSON } from "../utils/uploadFabricJSON.js";

const CardController = {
  // [GET] /api/cards
  getAll: async (req, res) => {
    try {
      const cards = await Card.find(
        {},
        "cardName imgURL cardDESC owner createdAt fabricEdit"
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
      const { cardName, imgURL, cardDESC, fabricEdit, owner } = req.body;

      const fabricEditObj =
        typeof fabricEdit === "string" ? JSON.parse(fabricEdit) : fabricEdit;

      // Upload tất cả ảnh trong canvas
      const { fabricEdit: processedEdit, imgURLs } =
        await processFabricEditImages(fabricEditObj);

      // Upload JSON canvas lên Cloudinary
      const fabricJSONStr = JSON.stringify(processedEdit);
      const fabricURL = await uploadFabricJSON(fabricJSONStr, cardName);

      const newCard = new Card({
        cardName,
        imgURL: imgURLs.length > 0 ? imgURLs : imgURL,
        cardDESC,
        fabricEdit: fabricURL, // 🔥 lưu URL vào fabricEdit
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
      const { cardName, imgURL, cardDESC, fabricEdit, owner } = req.body;

      const fabricEditObj =
        typeof fabricEdit === "string" ? JSON.parse(fabricEdit) : fabricEdit;

      // Upload tất cả ảnh trong canvas
      const { fabricEdit: processedEdit, imgURLs } =
        await processFabricEditImages(fabricEditObj);

      // Upload JSON canvas lên Cloudinary
      const fabricJSONStr = JSON.stringify(processedEdit);
      const fabricURL = await uploadFabricJSON(fabricJSONStr, cardName);

      const updatedCard = await Card.findByIdAndUpdate(
        id,
        {
          cardName,
          imgURL: imgURLs.length > 0 ? imgURLs : imgURL,
          cardDESC,
          fabricEdit: fabricURL, // 🔥 lưu URL vào fabricEdit
          owner,
        },
        { new: true }
      );

      if (!updatedCard)
        return res.status(404).json({ message: "Card not found" });

      res.json({ message: "Card updated", card: updatedCard });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default CardController;

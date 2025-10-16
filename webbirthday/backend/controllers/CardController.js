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
        "cardName imgURL cardDESC owner createdAt fabricEdit isEditable"
      ).populate("owner", "username");
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

      let fabricURL;
      let imgURLs = imgURL || [];

      if (fabricEdit) {
        const fabricEditObj =
          typeof fabricEdit === "string" ? JSON.parse(fabricEdit) : fabricEdit;

        // Upload tất cả ảnh trong canvas
        const { fabricEdit: processedEdit, imgURLs: uploadedImgs } =
          await processFabricEditImages(fabricEditObj);

        // Upload JSON canvas lên Cloudinary
        const fabricJSONStr = JSON.stringify(processedEdit);
        fabricURL = await uploadFabricJSON(fabricJSONStr, cardName);

        if (uploadedImgs.length > 0) imgURLs = uploadedImgs;
      }

      const newCard = new Card({
        cardName,
        imgURL: imgURLs,
        cardDESC,
        fabricEdit: fabricURL,
        owner,
        isEditable: true, // mặc định mới tạo là có thể chỉnh sửa
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
      const { cardName, imgURL, cardDESC, fabricEdit, owner, isEditable } =
        req.body;

      const updatedFields = {
        cardName,
        imgURL,
        cardDESC,
        owner,
      };

      // Cho phép cập nhật trạng thái isEditable
      if (typeof isEditable !== "undefined") {
        updatedFields.isEditable = isEditable;
      }

      // Chỉ xử lý Fabric JSON khi gửi dữ liệu mới
      if (fabricEdit) {
        const fabricEditObj =
          typeof fabricEdit === "string" ? JSON.parse(fabricEdit) : fabricEdit;

        const { fabricEdit: processedEdit, imgURLs: uploadedImgs } =
          await processFabricEditImages(fabricEditObj);

        const fabricJSONStr = JSON.stringify(processedEdit);
        const fabricURL = await uploadFabricJSON(fabricJSONStr, cardName);

        updatedFields.fabricEdit = fabricURL;
        if (uploadedImgs.length > 0) updatedFields.imgURL = uploadedImgs;
      }

      const updatedCard = await Card.findByIdAndUpdate(id, updatedFields, {
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

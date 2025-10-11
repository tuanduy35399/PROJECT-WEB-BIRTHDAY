// controllers/TemplateController.js
import Template from "../models/Template.js";
import { processFabricEditImages } from "../utils/processFabricEdit.js";
import { uploadFabricJSON } from "../utils/uploadFabricJSON.js";

const TemplateController = {
  // [POST] /api/templates
  create: async (req, res) => {
    try {
      const { name, owner, imgURL, fabricEdit } = req.body;

      const fabricEditObj =
        typeof fabricEdit === "string" ? JSON.parse(fabricEdit) : fabricEdit;

      // Upload tất cả ảnh trong canvas
      const { fabricEdit: processedEdit, imgURLs } =
        await processFabricEditImages(fabricEditObj);

      // Upload JSON canvas lên Cloudinary
      const fabricJSONStr = JSON.stringify(processedEdit);
      const fabricURL = await uploadFabricJSON(fabricJSONStr, name);

      const newTemplate = new Template({
        name,
        owner,
        imgURL: imgURLs.length > 0 ? imgURLs : imgURL,
        fabricEdit: fabricURL, // 🔥 lưu URL vào fabricEdit
      });

      await newTemplate.save();

      res.status(201).json({
        message: "Template created successfully",
        template: newTemplate,
      });
    } catch (err) {
      console.error("Error creating template:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // [GET] /api/templates
  getAll: async (req, res) => {
    try {
      const templates = await Template.find().populate("owner", "username");
      res.json(templates);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // [GET] /api/templates/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const template = await Template.findById(id).populate(
        "owner",
        "username"
      );
      if (!template)
        return res.status(404).json({ message: "Template not found" });

      res.json(template);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // [PUT] /api/templates/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, owner, imgURL, fabricEdit } = req.body;

      const fabricEditObj =
        typeof fabricEdit === "string" ? JSON.parse(fabricEdit) : fabricEdit;

      const { fabricEdit: processedEdit, imgURLs } =
        await processFabricEditImages(fabricEditObj);

      // Upload JSON canvas lên Cloudinary
      const fabricJSONStr = JSON.stringify(processedEdit);
      const fabricURL = await uploadFabricJSON(fabricJSONStr, name);

      const updatedTemplate = await Template.findByIdAndUpdate(
        id,
        {
          name,
          owner,
          imgURL: imgURLs.length > 0 ? imgURLs : imgURL,
          fabricEdit: fabricURL, // 🔥 lưu URL vào fabricEdit
        },
        { new: true }
      );

      if (!updatedTemplate) {
        return res.status(404).json({ message: "Template not found" });
      }

      res.json({
        message: "Template updated successfully",
        template: updatedTemplate,
      });
    } catch (err) {
      console.error("Error updating template:", err);
      res.status(500).json({ error: err.message });
    }
  },
};

export default TemplateController;

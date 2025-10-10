import Template from "../models/Template.js";
import { processFabricEditImages } from "../utils/processFabricEdit.js";

const TemplateController = {
  // [POST] /api/templates
  create: async (req, res) => {
    try {
      const { name, owner, imgURL, fabricEdit } = req.body;

      // ✅ Nếu có cần xử lý ảnh bên trong fabricEdit (chỉ khi dùng ở frontend)
      const fabricEditObj =
        typeof fabricEdit === "string" ? JSON.parse(fabricEdit) : fabricEdit;

      const { fabricEdit: processedEdit, imgURLs } =
        await processFabricEditImages(fabricEditObj);

      // ✅ Lưu lại dạng string để không bị lỗi cast
      const newTemplate = new Template({
        name,
        owner,
        imgURL: imgURLs.length > 0 ? imgURLs : imgURL,
        fabricEdit: JSON.stringify(processedEdit), // 🔥 stringify trước khi lưu
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
      let { name, owner, imgURL, fabricEdit } = req.body;

      const fabricEditObj =
        typeof fabricEdit === "string" ? JSON.parse(fabricEdit) : fabricEdit;

      const { fabricEdit: processedEdit, imgURLs } =
        await processFabricEditImages(fabricEditObj);

      const updatedTemplate = await Template.findByIdAndUpdate(
        id,
        {
          name,
          owner,
          fabricEdit: JSON.stringify(processedEdit), // 🔥 stringify ở đây nữa
          imgURL: imgURLs.length > 0 ? imgURLs : imgURL,
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

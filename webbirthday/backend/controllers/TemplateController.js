import Template from "../models/Template.js";

const TemplateController = {
  // [POST] /api/templates
  create: async (req, res) => {
    try {
      const {  name, owner, imgURL, fabricEdit } = req.body;

      const newTemplate = new Template({
        name,
        owner,
        imgURL,
        fabricEdit,
      });

      await newTemplate.save();
      res
        .status(201)
        .json({
          message: "Template created successfully",
          template: newTemplate,
        });
    } catch (err) {
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
      const updates = req.body;

      const updatedTemplate = await Template.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedTemplate) {
        return res.status(404).json({ message: "Template not found" });
      }

      res.json({
        message: "Template updated successfully",
        template: updatedTemplate,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default TemplateController;

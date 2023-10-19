const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Get all tags
router.get("/", async (req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: [
                { model: Product, through: ProductTag, as: "products" },
            ],
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single tag by ID
router.get("/:id", async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [
                { model: Product, through: ProductTag, as: "tagged_products" },
            ],
        });
        if (!tagData) {
            res.status(404).json({ message: "No tag found with that id!" });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new tag
router.post("/", async (req, res) => {
    try {
        const newTag = await Tag.create(req.body);
        res.status(200).json(newTag);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a tag by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedTag = await Tag.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updatedTag[0]) {
            res.status(404).json({ message: "No tag found with that id!" });
            return;
        }
        res.status(200).json(updatedTag);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a tag by ID
router.delete("/:id", async (req, res) => {
    try {
        const tagData = await Tag.destroy({
            where: { id: req.params.id },
        });
        if (!tagData) {
            res.status(404).json({ message: "No tag found with that id!" });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

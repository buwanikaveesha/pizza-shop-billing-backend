const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST add a new item
router.post('/', async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price || isNaN(price) || price <= 0) {
        return res.status(400).json({ message: "Invalid item data" });
    }

    const item = new Item({
        name,
        price: parseFloat(price)
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT update an item by ID
router.put('/:id', async (req, res) => {
    const { name, price } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name, price },
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: "Error updating item" });
    }
});

module.exports = router;

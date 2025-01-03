const express = require('express');
const router = express.Router();
const BillItem = require('../models/BillItem'); // Ensure this path is correct

// POST: Add a new bill item
router.post('/', async (req, res) => {
    const { name, price, quantity } = req.body;

    // Validate input
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: "Invalid name" });
    }
    if (!price || isNaN(price) || price <= 0) {
        return res.status(400).json({ message: "Invalid price" });
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    try {
        const total = price * quantity;

        // Create a new bill item instance
        const newBillItem = new BillItem({
            name: name.trim(),
            price,
            quantity,
            total,
        });

        // Save to the database
        await newBillItem.save();
        res.status(201).json(newBillItem);
    } catch (error) {
        console.error("Error saving bill item:", error);
        res.status(500).json({ message: "Error saving bill item", error: error.message });
    }
});

module.exports = router;

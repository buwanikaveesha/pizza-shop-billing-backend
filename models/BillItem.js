const mongoose = require('mongoose');

// Define the schema for the BillItem
const BillItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
});

// Create the model from the schema
const BillItem = mongoose.model('BillItem', BillItemSchema);

module.exports = BillItem;

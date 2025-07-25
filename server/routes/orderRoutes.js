const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // קובץ המודל

// יצירת הזמנה
router.post('/', async (req, res) => {
  const { fullName, address, phone, items } = req.body;

  if (!fullName || !address || !phone || !items || items.length === 0) {
    return res.status(400).json({ error: 'יש למלא את כל השדות כולל מוצרים' });
  }

  try {
    const newOrder = new Order({ fullName, address, phone, items });
    await newOrder.save();
    res.status(201).json({ message: 'ההזמנה נשמרה בהצלחה' });
  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ error: 'שגיאה בשמירת ההזמנה' });
  }
});

// שליפת כל ההזמנות
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ error: 'שגיאה בשליפת ההזמנות' });
  }
});

module.exports = router;

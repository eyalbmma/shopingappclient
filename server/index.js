const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes'); // ✅ יבוא ה־router

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// חיבור למסד נתונים
mongoose.connect('mongodb://localhost:27017/ordersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// שימוש ב־Routes
app.use('/api/orders', orderRoutes);  // ⬅️ משויך לתחילת הנתיב

// דף ברירת מחדל
app.get('/', (req, res) => {
  res.send('API is running');
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

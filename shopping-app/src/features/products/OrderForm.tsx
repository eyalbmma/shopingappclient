// src/features/products/OrderForm.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { removeFromCart } from './cart/cartSlice';
import { submitOrder } from '../../api/productApi'; // ✅ מייבא את קריאת ה־API

export default function OrderForm() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
  if (!fullName || !address || !phone) {
    alert('יש למלא את כל השדות');
    return;
  }

  const order = {
    fullName,
    address,
    phone,
    items: cartItems
  };

  try {
    const res = await submitOrder(order);
    if (res.message) {
      alert('ההזמנה נשלחה בהצלחה!');
      cartItems.forEach(i => dispatch(removeFromCart(i.id)));
    } else {
      alert('אירעה שגיאה בשליחת ההזמנה');
    }
  } catch (error) {
    console.error(error);
    alert('שגיאת רשת');
  }
};

  return (
    <div style={{ border: '1px solid black', padding: '20px', marginTop: '30px' }}>
      <h2>טופס הזמנה</h2>
      <input placeholder="שם מלא" value={fullName} onChange={(e) => setFullName(e.target.value)} /><br />
      <input placeholder="כתובת" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
      <input placeholder="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />

      <h3>מוצרים בעגלה:</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity}
          </li>
        ))}
      </ul>

      <button 
  onClick={handleSubmit} 
  disabled={cartItems.length === 0}
>
  אשר הזמנה
</button>

    </div>
  );
}

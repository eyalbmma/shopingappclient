import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from './cartSlice';

export function CartView() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return <p>🛒 העגלה ריקה</p>;

  return (
    <div>
      <h2>העגלה שלי</h2>
      <table>
        <thead>
          <tr>
            <th>שם מוצר</th>
            <th>מחיר יחידה</th>
            <th>כמות</th>
            <th>סה"כ</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price} ₪</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity} ₪</td>
              <td>
                <button onClick={() => dispatch(increaseQuantity(item.id))}>➕</button>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>➖</button>
                <button onClick={() => dispatch(removeFromCart(item.id))}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>סה"כ לתשלום: {total} ₪</h3>
    </div>
  );
}

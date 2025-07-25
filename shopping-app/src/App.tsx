import React from 'react';
import { ProductList } from './features/products/ProductList';
import { CartView } from './features/products/cart/CartView';
import OrderForm from './features/products/OrderForm'; // ✅ הוספה

function App() {
  return (
    <div>
      <h1>רשימת קניות</h1>
      <ProductList />
      <CartView />
      <OrderForm /> {/* ✅ הוספת טופס ההזמנה */}
    </div>
  );
}

export default App;

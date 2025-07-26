import React from 'react';
import { ProductList } from './features/products/ProductList';
import { CartView } from './features/products/cart/CartView';
import OrderForm from './features/products/OrderForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>רשימת קניות</h1>
      </header>
      <ProductList />
      <CartView />
      <OrderForm />
    </div>
  );
}

export default App;

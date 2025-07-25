// src/features/products/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, setCategory } from './productSlice';
import { AppDispatch, RootState } from '../../app/store';
import { addToCart } from './cart/cartSlice';
import { Product } from '../../types';

export function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategoryId } = useSelector((state: RootState) => state.products);

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const [quantities, setQuantities] = useState<{ [productId: number]: number }>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value > 0 ? value : 1,
    }));
  };

  return (
    <div>
      <h2>רשימת קניות</h2>

      <h3>קטגוריות</h3>
      <select onChange={(e) => dispatch(setCategory(Number(e.target.value)))}>
        <option value="">בחר קטגוריה</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <h3>מוצרים</h3>
      {selectedCategory ? (
        <ul>
          {selectedCategory.products.map((p: Product) => (
            <li key={p.id}>
              {p.name} - {p.price} ₪
              <input
                type="number"
                min="1"
                value={quantities[p.id] || 1}
                onChange={(e) => handleQuantityChange(p.id, Number(e.target.value))}
                style={{ width: '50px', margin: '0 10px' }}
              />
              <button onClick={() => dispatch(addToCart({ ...p, quantity: quantities[p.id] || 1 }))}>
                הוסף לעגלה
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>לא נבחרה קטגוריה</p>
      )}
    </div>
  );
}

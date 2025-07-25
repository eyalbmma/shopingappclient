import axios from 'axios';

// בסיסי URL מופרדים לפי שירות
const DOTNET_BASE_URL = 'http://localhost:7137/api'; // ASP.NET Core
const NODE_BASE_URL = 'http://localhost:5000/api';   // Node.js

// ✅ שליפת קטגוריות (משרת .NET)
export const getCategories = async () => {
  const response = await axios.get(`${DOTNET_BASE_URL}/categories`);
  return response.data;
};

// ❌ פונקציה זו לא נדרשת לפי המחוון (אין endpoint כזה בשרת .NET)
export const getProductsByCategory = async (categoryId: number) => {
  console.warn('getProductsByCategory not implemented in API – all products are returned with categories.');
  return [];
};

// ✅ שליחת הזמנה (לשרת Node.js)
export const submitOrder = async (orderData: {
  fullName: string;
  address: string;
  phone: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}) => {
  const response = await axios.post(`${NODE_BASE_URL}/orders`, orderData);
  return response.data;
};

export {};

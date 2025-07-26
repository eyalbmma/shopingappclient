import axios from 'axios';

const DOTNET_BASE_URL = process.env.REACT_APP_DOTNET_BASE_URL!;
const NODE_BASE_URL = process.env.REACT_APP_NODE_BASE_URL!;

// ✅ שליפת קטגוריות (משרת .NET)
export const getCategories = async () => {
  const response = await axios.get(`${DOTNET_BASE_URL}/categories`);
  return response.data;
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

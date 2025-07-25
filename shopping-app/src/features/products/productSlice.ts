// src/features/products/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from '../../api/productApi';


// טיפוסים
type Category = {
  id: number;
  name: string;
  products: Product[];
};

type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
};

// thunk עם טיפוסי תוצאה
export const fetchCategories = createAsyncThunk<Category[]>(
  'products/fetchCategories',
  async () => await getCategories()
);



// מצב ראשוני
type ProductState = {
  categories: Category[];
  products: Product[];
  selectedCategoryId: number | null;
};

const initialState: ProductState = {
  categories: [],
  products: [],
  selectedCategoryId: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      
  },
});

export const { setCategory } = productSlice.actions;
export default productSlice.reducer;

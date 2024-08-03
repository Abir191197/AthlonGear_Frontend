import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  price: number;
}

export interface CartState {
  carts: CartItem[];
}

const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      // Check if the item already exists in the cart
      const itemExists = state.carts.some(
        (cartItem) => cartItem._id === item._id
      );
      if (!itemExists) {
        state.carts.push(item);
      }
    },
    removeItem: (state, action: PayloadAction<{ _id: string }>) => {
      state.carts = state.carts.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selector to get the number of items in the cart
export const selectCartItemCount = (state: { cart: CartState }) =>
    state.cart.carts.length;


// Selector to check if an item is in the cart
export const selectIsItemInCart = (state: { cart: CartState }, itemId: string) =>
  state.cart.carts.some((item) => item._id === itemId);
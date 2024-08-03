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
  quantity: number; // Added quantity property
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
      const existingItem = state.carts.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        // If the item already exists, increase the quantity up to the stock count
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1;
        }
      } else {
        // If the item does not exist, add it to the cart with quantity 1
        state.carts.push({ ...item, quantity: 1 });
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
    IncreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const itemId = action.payload._id;
      const existingItem = state.carts.find((item) => item._id === itemId);

      if (existingItem) {
        // Increase quantity if it's less than the stock count
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1;
        }
      }
    },
    DecreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const itemId = action.payload._id;
      const existingItem = state.carts.find((item) => item._id === itemId);

      if (existingItem) {
        // Decrease quantity but not below 1
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  IncreaseQuantity,
  DecreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// Selector to get the number of items in the cart
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.carts.length;

// Selector to check if an item is in the cart
export const selectIsItemInCart = (
  state: { cart: CartState },
  itemId: string
) => state.cart.carts.some((item) => item._id === itemId);

import React, { createContext, useReducer, useContext } from 'react';

// Initial cart state
const initialState = {
  items: [],
};

// Action types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart provider to wrap the app
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

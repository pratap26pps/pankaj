 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
  showRazorpay: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder(state, action) {
      const newOrder = {
        id: Date.now(),
        items: action.payload.items,
        subtotal: action.payload.subtotal || 0,
        tax: action.payload.tax || 0,
        total: action.payload.total,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };
      state.orders.push(newOrder);
      localStorage.setItem("user-orders", JSON.stringify(state.orders));
    },
    updateOrderStatus(state, action) {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) order.status = status;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
    },
    setShowRazorpay(state, action) {
      state.showRazorpay = action.payload;
    },
  },  
});

export const { placeOrder, updateOrderStatus, setOrders, setCurrentOrder, setShowRazorpay } = orderSlice.actions;
export default orderSlice.reducer;

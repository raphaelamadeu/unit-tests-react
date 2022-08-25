import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'cats',
  initialState: [],
  reducers: {
    setCats(_state, action) {
      return [...action.payload];
    },
    toggleFavored(state, action) {
      return [...state.map(cat => {
        if(cat.id !== action.payload) return cat;

        return {
          ...cat,
          favored: !cat.favored
        }
      })]
    }
  }
});

export const { setCats, toggleFavored } = slice.actions;
export const { reducer } = slice;
export const store = configureStore({
  reducer: slice.reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

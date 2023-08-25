import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

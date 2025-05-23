import { configureStore } from "@reduxjs/toolkit";
import statsSlice from "./stats";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    stats: statsSlice.reducer,
  },
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

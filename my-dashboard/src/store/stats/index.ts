import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TRecordType, TTimePeriod } from "./stats.types";

interface ExampleState {
  currentRecord: TRecordType;
  timePeriod: TTimePeriod;
}

const initialState: ExampleState = {
  currentRecord: "Total",
  timePeriod: "Years",
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    changeRecordType: (state, action: PayloadAction<TRecordType>) => {
      state.currentRecord = action.payload;
    },
    changeTimePeriod: (state, action: PayloadAction<TTimePeriod>) => {
      state.timePeriod = action.payload;
    },
  },
});

export const { changeRecordType, changeTimePeriod } = statsSlice.actions;

export default statsSlice;

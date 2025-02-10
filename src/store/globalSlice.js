import { createSlice } from "@reduxjs/toolkit";
import linkSource from '@/source/link.json'
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    showContact: false,
    globalDrawer: 'contact',
    viewSourceId: 'renderFrame',
    dataSource: linkSource.dev
  },
  reducers: {
    switchShowContact: (state, action) => {
      state.showContact = action.payload;
      state.globalDrawer = 'contact'
    },
    switchGlobalDrawer: (state, action) => {
      state.showContact = action.payload;
      state.globalDrawer = 'menu'
    },
    setViewSourceId: (state, action) => {
      state.viewSourceId = action.payload;
    }
  }
});
export const { switchShowContact,switchGlobalDrawer } = globalSlice.actions;
export default globalSlice.reducer;
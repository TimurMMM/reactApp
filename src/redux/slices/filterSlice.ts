import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TSortChoose = {
  name: string;
  prop: "rating" | "price" | "title";
};

interface IFilterSlice {
  openSearch: boolean;
  currentPage: number;
  activeCat: number;
  searchData: string;
  activeOrder: number;
  sortChoose: TSortChoose;
}

const initialState: IFilterSlice = {
  openSearch: false,
  currentPage: 1,
  activeCat: 0,
  searchData: "",
  activeOrder: 0,
  sortChoose: {
    name: "Popular",
    prop: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setOpenSearch(state, action: PayloadAction<boolean>) {
      state.openSearch = action.payload;
    },
    setActiveCat(state, action: PayloadAction<number>) {
      state.activeCat = action.payload;
    },
    setSearchData(state, action: PayloadAction<string>) {
      state.searchData = action.payload;
    },
    setActiveOrder(state, action: PayloadAction<number>) {
      state.activeOrder = action.payload;
    },
    setSortChoose(state, action: PayloadAction<TSortChoose>) {
      state.sortChoose = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setOpenSearch,
  setActiveCat,
  setSearchData,
  setActiveOrder,
  setSortChoose,
  setCurrentPage,
} = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    tradetypes: [],
    categories: [],
    subcategories: [],
    subcategories2: [],
    districts: [],
    regions: [],
    order: "all",
    product: "all",
    anns: "all",
    name: "",
  },
  reducers: {
    filterTradeTypes: (state, { payload }) => {
      state.tradetypes = payload;
    },
    filterCategories: (state, { payload }) => {
      state.categories = payload;
    },
    filterSubcategories: (state, { payload }) => {
      state.subcategories = payload;
    },
    filterSubcategories2: (state, { payload }) => {
      state.subcategories2 = payload;
    },
    filterDistricts: (state, { payload }) => {
      state.districts = payload;
    },
    filterRegions: (state, { payload }) => {
      state.regions = payload;
    },
    filterOrder: (state, { payload }) => {
      state.order = payload;
    },
    filterProduct: (state, { payload }) => {
      state.product = payload;
    },
    filterName: (state, { payload }) => {
      state.name = payload;
    },
    filterAnns: (state, { payload }) => {
      state.anns = payload;
    },
    clearFilters: (state) => {
      state.tradetypes = [];
      state.categories = [];
      state.subcategories = [];
      state.subcategories2 = [];
      state.districts = [];
      state.regions = [];
      state.order = "all";
      state.product = "all";
      state.name = "";
    },
  },
  extraReducers: {},
});

export const {
  filterCategories,
  filterDistricts,
  filterRegions,
  filterSubcategories,
  filterSubcategories2,
  filterTradeTypes,
  filterOrder,
  filterProduct,
  filterName,
  filterAnns,
  clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;

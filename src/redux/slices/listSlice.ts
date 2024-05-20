import axios from "../../axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "./cartSlice";
import { TOrdersAdmin } from "../../pages/ProductsPanel";

type TFetchProductsArgs = {
  sortProp: string;
  orderProp: boolean;
  categoryProp: string;
  searchProp: string;
  currentPage: number;
};

type TFetchAdminOrdersArgs = {
  delivery?: string;
  currentPage: number;
};

export const fetchProducts = createAsyncThunk(
  "list/fetchBurgersStatus",
  async (params: TFetchProductsArgs) => {
    const { sortProp, orderProp, categoryProp, searchProp, currentPage } =
      params;
    const { data } = await axios.get<IPayload>(
      `/products?page=${currentPage}&limit=12${categoryProp}&sort=${sortProp},${
        orderProp ? "desc" : "asc"
      }${searchProp}`
    );

    console.log(currentPage);
    return data;
  }
);
export const fetchUserOrders = createAsyncThunk(
  "list/fetchUserOrdersStatus",
  async () => {
    const { data } = await axios.get<TOrdersAdmin>("/userposts");
    return data;
  }
);

export const fetchAdminOrders = createAsyncThunk(
  "list/fetchAdminOrdersStatus",
  async (params: TFetchAdminOrdersArgs) => {
    const { delivery, currentPage } = params;
    const { data } = await axios.get<TOrdersAdmin>(
      `/posts/${delivery}?page=${currentPage}&limit=15`
    );
    return data;
  }
);

export type TUser = {
  _id: string;
  fullName: string;
  avatarUrl: string;
};

export interface IProdItem {
  _id: string;
  title: string;
  text: string;
  typeListId: string[];
  sizeList: string[];
  price: number;
  category: number;
  rating: number;
  viewsCount: number;
  user: TUser;
  imageUrl: string;
}

export interface IOrderItem {
  _id: string;
  viewsCount: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  user: TUser;
  products: ICartItem[];
  delivery?: TUser;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IProducts {
  items: IProdItem[];
  status: Status;
  total: number;
}

export interface IOrders {
  items: IOrderItem[];
  status: Status;
  total: number;
}

interface IListSlice {
  products: IProducts;
  orders: IOrders;
}

interface IPayload {
  products: IProdItem[];
  total: number;
}

const initialState: IListSlice = {
  products: { items: [], status: Status.LOADING, total: 0 },
  orders: { items: [], status: Status.LOADING, total: 1 },
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IProdItem[]>) {
      state.products.items = action.payload;
    },
    setOrders(state) {
      state.orders.items = [];
      state.orders.total = 1;
    },
    setTotalOrders(state, action) {
      state.orders.total = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products.status = Status.LOADING;
        state.products.items = [];
        state.products.total = 0;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IPayload>) => {
          state.products.items = action.payload.products;
          state.products.total = action.payload.total;
          state.products.status = Status.SUCCESS;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.products.status = Status.ERROR;
        state.products.items = [];
        state.products.total = 0;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.orders.status = Status.LOADING;
        state.orders.items = [];
        state.orders.total = 0;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders.items = action.payload.items;
        state.orders.status = Status.SUCCESS;
        state.orders.total = action.payload.total;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.orders.status = Status.ERROR;
        state.orders.items = [];
        state.orders.total = 0;
      })
      .addCase(fetchAdminOrders.pending, (state) => {
        state.orders.status = Status.LOADING;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.orders.items.push(...action.payload.items);
        state.orders.status = Status.SUCCESS;
        state.orders.total = action.payload.total;
      })
      .addCase(fetchAdminOrders.rejected, (state) => {
        state.orders.status = Status.ERROR;
        state.orders.items = [];
        state.orders.total = 0;
      });
  },
});

export const { setItems, setOrders, setTotalOrders } = listSlice.actions;
export default listSlice.reducer;

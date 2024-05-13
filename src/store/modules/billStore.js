// 账单列表相关store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

const { setBillList } = billStore.actions;

// 编写异步
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(res.data));
  };
};

const reducer = billStore.reducer;

export { getBillList };
export default reducer;

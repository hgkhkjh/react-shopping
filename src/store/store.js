import { configureStore } from '@reduxjs/toolkit'
import cartmsgtodoSlice from "./cart"
import othermsgSlice from "./otherstate"
import collectSlice from "./collect"
export const store = configureStore({
  reducer: {
    cartmsg: cartmsgtodoSlice,
    othermsg: othermsgSlice,
    collectmsg: collectSlice
  }
})

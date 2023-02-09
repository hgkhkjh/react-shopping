import { createSlice,current } from '@reduxjs/toolkit'
import GLOBALCOLOR from "../GLOBAL"
//必须有一哥初始值
const initialState = {
    galcolor: window.localStorage.getItem("globalcolor")??GLOBALCOLOR,
    listtyleindex:0,
    islogin:window.localStorage.getItem("token")?true:false,
    productlistcid:""
}
export const todoSlice = createSlice({
    name: 'collectSlice',
    initialState,
    reducers: {
        // 改变颜色
        changegalcolor: (state, action) => {
            state.galcolor=action.payload
        },
        changelisttyleindex:(state, action) => {
            state.listtyleindex+= action.payload
        },
        changeislogin:(state, action) => {
            state.islogin=action.payload
        },
        changeproductlistcid:(state, action) => {
            state.productlistcid=action.payload
        },
    },
})

// reducer方法的每一个case都会生成一个Action
export const { changegalcolor,changelisttyleindex,changeislogin,changeproductlistcid} = todoSlice.actions
export default todoSlice.reducer


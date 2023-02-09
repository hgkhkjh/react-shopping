import { createSlice } from '@reduxjs/toolkit'
//必须有一哥初始值
const initialState = {
    collectmsg: [],
}
export const todoSlice = createSlice({
    name: 'collectSlice',
    initialState,
    reducers: {
        //添加商品
        addcollectmsg: (state, action) => {
            state.collectmsg.push(action.payload)
        },
        //删除商品
        detecollectmsg: (state, action) => {
            let { collectmsg } = state
            for (let item of collectmsg) {
                if (item.goods_id === action.payload.goods_id) {
                    collectmsg.splice(collectmsg.indexOf(item), 1)
                }
            }

        },
    },
})

// reducer方法的每一个case都会生成一个Action
export const { addcollectmsg, detecollectmsg } = todoSlice.actions
export default todoSlice.reducer


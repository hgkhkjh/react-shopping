import { createSlice,current } from '@reduxjs/toolkit'
//必须有一哥初始值
const initialState = {
  productmsg: []
}
export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    //添加商品
    addproductmsg: (state, action) => {
      // Redux Toolkit允许我们在reducers中直接写改变state的逻辑.
      // 由于使用了Immer库,所以并没有真的改变state
      let ispush = true
      const { productmsg } = state
      for (let productmsgitem of productmsg) {
        if (productmsgitem.goods_id === action.payload.goods_id) {
          ispush = false
          if (productmsgitem.num)
            productmsgitem.num++

          else
            productmsgitem.num = 2
        }
      }
      if (ispush) state.productmsg.push(action.payload)


    },
    //删除商品
    deteproductmsg: (state, action) => {
      let { productmsg } = state
      productmsg.splice(action.payload, 1)
    },
    //点击复选框
    checkclick: (state, action) => {
      let { productmsg } = state
      if (productmsg[action.payload].checked)
        productmsg[action.payload].checked = !productmsg[action.payload].checked
      else
        productmsg[action.payload].checked = true

    },
    //增加商品数量减少商品数量
    handelnum: (state, action) => {
      let { productmsg } = state
      if (productmsg[action.payload.index]?.num)
        productmsg[action.payload.index].num = action.payload.value
      else
        productmsg[action.payload.index].num = 1 + action.payload.value
    },
    //全选功能
    allchecked: (state, action) => {
      console.log(action.payload);
      let { productmsg } = state
      // productmsg= productmsg.map(item=>{
      //   item.checked=action.payload
      //   return  item
      // })
      for (let item of productmsg) {
        item.checked = action.payload

      }
      console.log(current(productmsg));

    },
  },
})

// reducer方法的每一个case都会生成一个Action
export const { addproductmsg, deteproductmsg, checkclick, handelnum,allchecked } = todoSlice.actions
export default todoSlice.reducer


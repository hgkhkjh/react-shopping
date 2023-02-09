import React from 'react'
import Tabbat from "../../components/tabbar/tabbar"
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'antd-mobile'
import { allchecked } from "../../store/cart"
import GLOBALCOLOR from "../../GLOBAL"

import ProductList from "../../components/productlist/ShopcartProductlist"
import Shopcartstyle from "./Shopcart"
import { useState } from 'react';
import { useEffect } from 'react';
export default function Shopcart() {
  const [totalprice, settotalprice] = useState(0)
  const [isallchecked, setisallchecked] = useState(false)
  const cartmsg = useSelector(state => state.cartmsg)
  const dispatch = useDispatch()
  //计算当总价格
  const clacprice = () => {
    let newisallchecked = true
    let nowprice = 0
    for (let item of cartmsg.productmsg) {
      if (item.checked === true) {
        if (item.num)
          nowprice += item.goods_price * item.num * 1
        else
          nowprice += item.goods_price * 1
      }
      else {
        newisallchecked = false
      }
      setisallchecked(newisallchecked)
    }
    settotalprice(nowprice)
  }

  useEffect(() => {
    clacprice()
  }, [cartmsg.productmsg])
  return (
    <Shopcartstyle checkcolor={window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR}>
      <Tabbat back={true} context={"购物车"}></Tabbat>
      {/* 购物车主体 */}
      <ProductList productsmsg={cartmsg.productmsg} isdelete showsum checked></ProductList>
      {/* 购物车算总价 */}
      <div className='cartcalc'>
        <div className='allchecked'><Checkbox checked={isallchecked} onChange={(value) => { dispatch(allchecked(value)) }}>全选</Checkbox></div>
        <div className='totalpricecontainer'>
          <div className='totalprice'>合计:￥{totalprice}</div>
          <div className='gobug' style={{ backgroundColor: window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR }}>去结算</div>
        </div>
      </div>
    </Shopcartstyle>
  )
}

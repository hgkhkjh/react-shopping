import React, { useState } from 'react'
import Tabbat from "../../components/tabbar/tabbar"
import BaseResquest from "../../network/Baseurl"
import qs from "query-string";
import GLOBALCOLOR from "../../GLOBAL"
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, Image, ImageViewer, Toast } from 'antd-mobile'
import { addproductmsg } from "../../store/cart"
import { addcollectmsg, detecollectmsg } from "../../store/collect"
import {
  useNavigate,
  useLocation
} from "react-router-dom"

import {
  TruckOutline,
} from 'antd-mobile-icons'

import { StarOutline } from 'antd-mobile-icons'
import { useEffect } from 'react';
import "./Productdetails.css"
export default function Productdetails() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [Productdetailsdatas, setProductdetailsdatas] = useState([])
  const [visible, setVisible] = useState(false)
  const [imgViewer, setimgViewer] = useState([])
  const parse = require('html-react-parser');
  const cartmsg = useSelector(state => state.cartmsg)
  const collectmsg = useSelector(state => state.collectmsg).collectmsg
  const dispatch = useDispatch()
  //获取数据
  const getProductdetailsdatas = () => {
    BaseResquest({
      url: `/goods/detail?goods_id=${qs.parse(search).goods_id}`
    }).then((res) => {
      setProductdetailsdatas(res.data.message);
    })
  }

  //点击轮播图查看图片
  const swiperclick = (item, index) => {
    setimgViewer(item.pics_big_url)
    setVisible(true)
  }
  //节流函数
  //处理收藏数据
  const handelcollectmsg = () => {
    //没有收藏
    let collectstate
    if (!findcollect()) {
      dispatch(addcollectmsg(Productdetailsdatas))
      collectstate = "收藏成功"
    }
    else {
      collectstate = "取消收藏"
      dispatch(detecollectmsg(Productdetailsdatas))
    }
    Toast.show({
      maskStyle: { fontSize: "1.5rem" },
      content: (() => { return (<div style={{ fontSize: "1.5rem" }}>{collectstate}</div>) })(),

    })

  }

  console.log(collectmsg);
  //生成图片数组
  // const handelimgViewer = () => {
  //   let imgViewerother = []
  //   if (Productdetailsdatas.length != 0) {
  //     for (let item of Productdetailsdatas.pics) {
  //       imgViewerother.push(item.pics_big_url)
  //     }
  //     setimgViewer(imgViewerother)
  //   }
  // }
  useEffect(() => {
    getProductdetailsdatas()
  }, [])

  useEffect(() => {
    // handelimgViewer()
  }, [Productdetailsdatas])
  // console.log("商品详情数据", Productdetailsdatas);

  const detaliupcart = (value) => {
    navigate("/Shopcart")
    // const locartion = useLocartion()
    // history.push(value)

  }

  //加入购物车
  const addcart = (value) => {
    let prudnum
    let iscartmsg = true
    for (let cartpruditem of cartmsg.productmsg) {
      if (cartpruditem.goods_id === Productdetailsdatas.goods_id)
        iscartmsg = false
      prudnum = cartpruditem.num ? cartpruditem.num * 1 + 1 : 2
    }
    //轻提示
    Toast.show({

      content: (() => { return (iscartmsg ? <div style={{ fontSize: "1.5rem" }}>加入成功 </div> : <div style={{ fontSize: "1.5rem" }}>{`加入成功,当前数量为${prudnum}`}</div>) })(),
      maskStyle: { fontSize: "2rem" },
    })
    //添加到状态管理

    dispatch(addproductmsg(Productdetailsdatas))
  }
  //立即购买
  const findcollect = () => {
    let isfind = false
    for (let item of collectmsg) {
      if (item.goods_id === Productdetailsdatas.goods_id)
        isfind = true
    }
    return isfind
  }
  console.log(Productdetailsdatas);
  return (
    Productdetailsdatas.length != 0 ?
      <div>
        <Tabbat back={true} context={"商品详情"}></Tabbat>
        {/* 轮播图 */}
        {
          Productdetailsdatas.pics.length === 0 ?
            <Image
              height="25rem" width="100%" src="" alt="暂无图片" /> :
            <Swiper loop>
              {

                Productdetailsdatas.pics ? Productdetailsdatas.pics.map((item, index) => {
                  return <Swiper.Item key={item.pics_id} >
                    <Image onClick={() => {
                      swiperclick(item, index)
                    }}
                      height="40rem" width="100%" src={item.pics_big_url} alt="" />

                  </Swiper.Item>
                }) : null
              }

            </Swiper>
        }

        {/* 图片查看器 */}
        <ImageViewer
          image={imgViewer}
          visible={visible}
          // defaultIndex={Viewerindex}
          onClose={() => {
            setVisible(false)
          }}
        />
        {/* 标题 */}
        <div className='detailetitle'>
          {/* 内容 */}
          <div className='detailtitlecontext'>
            <span className='detailprice' style={{ color: window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR }} >￥{Productdetailsdatas.goods_price}</span>
            <span className='detititle'>{Productdetailsdatas.goods_name}</span>
          </div>
          {/* 收藏 */}
          <div className='detailcollect' style={{ color: !findcollect() ? null : window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR }} onClick={() => handelcollectmsg()}>
            <StarOutline fontSize={19} />
            收藏
          </div>

        </div>
        <div className='detailhr'></div>

        <div   >
          <span className='textdetails' style={{ color: window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR }}> 图文详情</span>
          <div className='detailintroduce'>
            {parse(Productdetailsdatas?.goods_introduce)}
          </div>
        </div>

        {/* 底部导航栏 */}
        <div className='detailstabBar'>
          <div className='tabbarcart' onClick={() => detaliupcart()}>
            <span className='tabbarcartspan'>
              <TruckOutline fontSize={20} />
              <br></br>
              购物车
            </span>
          </div>
          <div className='addcart'>
            <span className='addcartspan' onClick={() => addcart()}> 加入购物车</span>
          </div>
          <div className='shoptabbar' style={{ backgroundColor: window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR }}>
            <span className='shoptabbarspan' >立即购买</span>
          </div>

        </div>
      </div> : null
  )
}

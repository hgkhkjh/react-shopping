import React, { useEffect, useState } from 'react'
import Tabbar from "../../components/tabbar/tabbar"
import { Swiper, Image } from 'antd-mobile'
import Search from '../../components/Search/Search.jsx'
import {
  useNavigate,
} from "react-router-dom"
//baseurl
import BaseResquest from "../../network/Baseurl"
import "./homepage.css"
export default function Homepage() {
  const navigate = useNavigate();
  //轮播图数据
  const [swiperdata, setswiperdata] = useState([])
  const [navdata, setnavdata] = useState([])
  const [floordata, setfloordata] = useState([])

  //获取轮播图信息公共接口
  const getswiperdata = () => {
    if (window.sessionStorage?.getItem("sshomeswpermsg")) {
      setswiperdata(JSON.parse(window.sessionStorage?.getItem("sshomeswpermsg")))
    }
    else {
      BaseResquest({
        url: "/home/swiperdata"
      }).then((res) => {
        window.sessionStorage.setItem("sshomeswpermsg", JSON.stringify(res.data.message))
        setswiperdata(JSON.parse(window.sessionStorage?.getItem("sshomeswpermsg")))
      })
    }

    // console.log(homemsg.data);
  }


  // const getswiperdata = () => {
  //   BaseResquest({

  //     url: IPURL + "home/swiperdata"
  //   }).then((res) => {
  //     setswiperdata(res.data.data)
  //     // console.log(res.data.data);

  //   })
  //   // console.log(homemsg.data);
  // }


  const getnavdata = () => {
    if (window.sessionStorage?.getItem("sshomenavmsg")) {
      setnavdata(JSON.parse(window.sessionStorage?.getItem("sshomenavmsg")))

    }
    else {
      BaseResquest({
        url: "/home/catitems"
      }).then((res) => {
        window.sessionStorage.setItem("sshomenavmsg", JSON.stringify(res.data.message))
        setnavdata(JSON.parse(window.sessionStorage?.getItem("sshomenavmsg")))

      })
    }

  }
  //点击导航跳转路由
  const navclick = () => {
    navigate('/Classify')
  }
  //获取楼层数据
  const getfloordata = () => {
    if (window.sessionStorage?.getItem("sshomefloormsg")) {
      setfloordata(JSON.parse(window.sessionStorage?.getItem("sshomefloormsg")))

    }
    else {
      BaseResquest({
        url: "/home/floordata"
      }).then((res) => {
        window.sessionStorage.setItem("sshomefloormsg", JSON.stringify(res.data.message))
        setfloordata(JSON.parse(window.sessionStorage?.getItem("sshomefloormsg")))

      })
    }
  }
  //获点击楼层跳转页面
  const upProductfetails = (item) => {
    //  let re = new RegExp("/","g")
    //   console.log(qs.parse(item.replace("?"+re, '?')));
    navigate(`/Productlist?query=风衣&cid=&pagenum=1&pagesize=10`)
    // navigate(`/Productlist${url}`)
    // BaseResquest({
    //   url: "/home/floordata"
    // }).then((res) => {
    //   setfloordata(res.data.message)
    // })
  }
  //点击轮播图数据跳转页面
  const swiperclick = (googid) => {
    navigate(`/Productdetails?goods_id=${googid}`)
  }

  useEffect(() => {
    getswiperdata()
    getnavdata()
    getfloordata()
  }, [])
  // console.log("轮播图数据", swiperdata);
  // console.log("首页导航数据", navdata);
  //  console.log("楼层数据",floordata);
  return (
    <>
      {/* 导入导航 */}
      <Tabbar context={"首页"}></Tabbar>
      <Search></Search>
      {/* 导入轮播图 */}
      {/* 公共接口 */}
      <Swiper autoplay loop>
        {
          swiperdata.map(item => {
            return <Swiper.Item key={item.goods_id} >
              <Image height="25rem" onClick={() => swiperclick(item.goods_id)} src={item.image_src} alt="" />
            </Swiper.Item>
          })
        }

      </Swiper>

      {/* 本地接口 */}
      {/* <Swiper autoplay loop>
        {
          swiperdata.map(item => {
            return <Swiper.Item key={item.goodsId} >
              <Image src={item.imageSrc} alt="" />
            </Swiper.Item>
          })
        }

      </Swiper> */}

      {/* 导航 */}
      <div className='homenavcontainer'>
        {
          navdata.map(item => {
            return <div onClick={() => navclick()}  style={{ width: "100%", margin: "1rem 1.3rem" }} key={item.image_src}>
              <img   className='hamenav' alt="#" src={item.image_src}>
              </img>
            </div>
          })
        }

      </div>
      {/* 楼层 */}
      <div className='floorcontainer'>
        {
          floordata.map(item => {
            return <div key={item.floor_title.image_src} style={{ overflow: "hidden", }}>
              <img alt="#" width="100%" style={{ marginTop: "0.7rem" }} src={item.floor_title.image_src}></img>
              <img src={item.product_list[0].image_src} onClick={() => upProductfetails(item.product_list[0])} alt="" width="40%" className='firstfloor' />
              {/* 后四个盒子 */}
              <div className='lastfourcontainer' >
                {
                  item.product_list.map((item, index) => {
                    return <div
                      className='lastfourfloor'
                      style={{
                        width: "45%", display: index === 0 ? "none" : "flex",
                        margin: " 1.5rem 0.1rem 0rem 0.1rem",
                        overflow: "hidden",
                        height: "100%"
                      }} key={item.image_src}
                      onClick={() => upProductfetails(item)}
                    >
                      <img width="100%" src={item.image_src} alt="#" />
                    </div>
                  })
                }</div>
            </div>
          })
        }
      </div>
    </>
  )
}

import React from 'react'
import Tabbat from "../../components/tabbar/tabbar"
import BaseResquest from "../../network/Baseurl"
import { DotLoading } from 'antd-mobile'
import "./productlist.css"
import InfiniteScroll from 'react-infinite-scroll-component';
import qs from "query-string";
import {
  useLocation,

} from "react-router-dom"
import BaseProductList from '../../components/productlist/BaseProductList'
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';

export default function Productlist(props) {
  const { search } = useLocation();
  const [prodyctlistdatas, setprodyctlistdatas] = useState([])
  const [pagenum, setpagenum] = useState(1)
  const [totaldata, settotaldata] = useState(null)
  const lsittypeindex = useSelector(state => state.othermsg).listtyleindex
  //获取数据
  const getprodyctlistdatas = () => {
    let newprodyctlistdatas = []
    newprodyctlistdatas = [...prodyctlistdatas]
    BaseResquest({
      url: `/goods/search?query=&cid=${qs.parse(search).cid}&pagenum=${pagenum}&pagesize=10`
    }).then((res) => {
      if (pagenum === 1) {
        settotaldata(res.data.message.total)
      }
      setpagenum(res.data.message.pagenum * 1 + 1)
      newprodyctlistdatas.push(...res.data.message.goods)
      setprodyctlistdatas(newprodyctlistdatas)
    })
  }

 
  //节流函数
  //下拉触底加载下一页
  // const addpage = async () => {
  //   let newprodyctlistdatas = []
  //   newprodyctlistdatas = [...prodyctlistdatas]
  //   console.log(pagenum,pagenum);
  //   await BaseResquest({
  //     url: `/goods/search?query=&cid=${qs.parse(search).cid}&pagenum=${pagenum??2}&pagesize=10`,
  //   }).then((res) => {
  //     pagenum = res.data.message.pagenum*1+1
  //     console.log(res);
  //     newprodyctlistdatas.push(...res.data.message.goods)
  //     setprodyctlistdatas(newprodyctlistdatas)

  //   })
  // }
  useEffect(() => {
    getprodyctlistdatas()
  }, [])
  return (
    <div >
      {/* 导入顶部导航 */}
      <Tabbat back={true} context={"商品列表"} listtype></Tabbat>
      <InfiniteScroll
        style={{
          display: lsittypeindex % 2 === 1 ? "grid" : null,
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "center"

        }}
        dataLength={prodyctlistdatas.length}
        next={getprodyctlistdatas}
        hasMore={prodyctlistdatas.length !== totaldata * 1}
        endMessage={
          <p style={{ textAlign: 'center', color: "#999" }}>
            <b>已经到底了哦~</b>
          </p>
        }
        loader={<div style={{ textAlign: 'center', }}><h4 style={{ color: "#999" }}>加载中<DotLoading></DotLoading></h4></div>}
      >
        <BaseProductList prodyctlistdatas={prodyctlistdatas} lsittypeindex={lsittypeindex}></BaseProductList>
        {/* {
          prodyctlistdatas.map((item, index) => {

            return <div className='product' style={{ display: lsittypeindex % 2 === 1 ? "block" : "grid", }} key={item.goods_id} onClick={() => upproductdetail(item)}>
              <div className='producticon'>
                <Image height={lsittypeindex % 2 === 1 ? "22rem" : "16rem"} width={lsittypeindex % 2 === 1 ? "22rem" : "16rem"} src={item.goods_big_logo ?? ""}></Image>
              </div>
              <div className='productdes'>
                <div className='producttitle'>
                  <span className='producttitlespan' style={{
                    display: lsittypeindex % 2 === 1 ? "block" : null,
                    whiteSpace: lsittypeindex % 2 === 1 ? "nowrap" : null
                  }}>
                    {item.goods_name}
                  </span>
                </div>
                <div className='productprice' style={{ color: window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR }}>
                  <span className='productpricespan' >
                    ￥{item.goods_price}
                  </span>
                </div>
              </div>

            </div>
          })
        } */}
      </InfiniteScroll>
    </div>
  )
}

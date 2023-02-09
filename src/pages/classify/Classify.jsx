import React from 'react'
import Tabbat from "../../components/tabbar/tabbar"
import { SideBar, Image } from 'antd-mobile'
import BaseResquest from "../../network/Baseurl"
import { useEffect } from 'react'
import { useState } from 'react'
import {  useDispatch } from 'react-redux';
import { changeproductlistcid } from "../../store/otherstate"
import Style from "./classifystyle"
import GLOBALCOLOR from "../../GLOBAL"
import {
  useNavigate,
} from "react-router-dom"
export default function Classify() {
  const navigate = useNavigate();
  const [classfiydatas, setclassfiydatas] = useState([])
  const [classfiylist, setclassclassfiylist] = useState(null)
  const dispatch = useDispatch()

  //获取分类数据
  const getclassfiydatas = () => {
    BaseResquest({
      url: "/categories"
    }).then((res) => {
      setclassfiydatas(res.data.message);
    })
  }

  const handelclsylist = (key) => {
    if (key) {
      let clicklist = classfiydatas.filter(item => {
        return item.cat_id == key
      })
      setclassclassfiylist(clicklist[0].children);
    } else {
      setclassclassfiylist(classfiydatas[0]?.children);
    }

  }
  // 点击分类跳转商品列表
  const lictcontext = (item) => {
    dispatch(changeproductlistcid(item.cat_id))
    //跳转路由
    navigate(`/Productlist?query=&cid=${item.cat_id}&pagenum=1&pagesize=10`)
  }
  useEffect(() => {
    getclassfiydatas()

  }, [])
  useEffect(() => {
    handelclsylist()
  }, [classfiydatas])
  return (
    <> {/* //导入导航 */}
      <Tabbat context={"分类"}></Tabbat>
      <Style color={window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR}>

        {/* 标签页 */}
        <div style={{ display: "inline-block" }}>
          <SideBar
            defaultActiveKey="1"
            onChange={key => handelclsylist(key)}
          >
            {
              classfiydatas.map(item => {
                return <SideBar.Item
                  // onChange={()=>handelclsylist(item)}
                  key={item.cat_id}

                  title={
                    <div >
                      {item.cat_name}
                    </div>
                  }
                />
              })
            }

          </SideBar>
        </div>
        <div className='listcontext'>
          {
            classfiylist ? classfiylist.map(item => {
              return <div key={item.cat_id}>
                <div className='listtitle'>
                  {/* 右侧内容标题 */}
                  <span>{`/ ${item.cat_name} /`}</span>
                </div>
                <div className='listbody'>
                  {
                    item.children ? item.children.map(item => {
                      // 显示内容图标
                      return <div key={item.cat_id} className='listcontext' onClick={() => lictcontext(item)}>
                        <div className='listcontexticon'>
                          <Image height="15rem" width="100%" lazy src={item.cat_icon} placeholder alt="" />
                        </div>
                        <div className='listcontexttitle'><span>{item.cat_name}</span></div>
                      </div>
                    }) : null
                  }
                </div>
              </div>
            }) : null
          }
        </div>
      </Style></>
  )
}

import React from 'react'
import Tabbat from "../../components/tabbar/tabbar"
import { SearchOutline } from 'antd-mobile-icons'
import GLOBALCOLOR from '../../GLOBAL'
import BaseResquest from "../../network/Baseurl"
import { Empty } from 'antd-mobile'
import { useState } from 'react'
import { FrownOutline } from 'antd-mobile-icons'
import "./search.css"
import {
    useNavigate

} from "react-router-dom"
export default function Search() {
    const navigate = useNavigate();
    const [searchmsg, setsearchmsg] = useState(null)
    //输入框改变事件
    let timeout = -1
    const searchchange = (e) => {
        console.log(timeout);
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            let str
            str = e.target.value.replace(/\s*/g, "");
            if (e.target.value.trim())
                //发送请求
                BaseResquest({
                    url: `/goods/qsearch?query=${str}`
                }).then((res) => {
                    setsearchmsg(res.data.message);
                })
        }, 500);
    }
    const searchltcik = (goods_id) => {
        navigate(`/Productdetails?goods_id=${goods_id}`)
    }
    console.log("搜索回来的数据", searchmsg);
    return (
        <>
            <Tabbat back={true} context={"搜索"}></Tabbat>
            <div className="searchcontainer" style={{ backgroundColor: window.localStorage.getItem("globalcolor")??GLOBALCOLOR }}>
                <input onChange={(e) => searchchange(e)} type="text" className='searchinput' placeholder='搜索商品' /><span className='searchicon'>
                    <SearchOutline />
                </span>
            </div>
            {/* 搜索主体 */}
            <ul>
                {searchmsg ?
                    searchmsg?.length === 0 ?
                        <Empty
                            style={{ padding: '5rem 0' }}
                            image={
                                <FrownOutline
                                    style={{
                                        color: 'var(--adm-color-light)',
                                        fontSize: "5rem",
                                    }}
                                />
                            }
                            description='暂无商品'
                        /> :
                        searchmsg.map(item => {
                            return <>
                                <li ley={item.goods_id} onClick={() => searchltcik(item.goods_id)} className='searchli' key={item.goods_id}>{item.goods_name}</li>
                            </>
                        }) : null
                }
            </ul>
        </>
    )
}

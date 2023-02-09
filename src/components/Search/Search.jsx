import React from 'react'
import "./search.css"
import { SearchOutline } from 'antd-mobile-icons'
import GLOBALCOLOR from '../../GLOBAL'
import {
  useNavigate

} from "react-router-dom"
export default function Search() {
  const navigate = useNavigate();

  const upsearch=()=>{
    navigate(`/Search`)
  }
  return (
    <div className="searchcontainer" onClick={()=>upsearch()} style={{backgroundColor:window.localStorage.getItem("globalcolor")??GLOBALCOLOR}}>
        
        <input type="text" className='searchinput' placeholder='搜索商品'/><span className='searchicon'>
            <SearchOutline />
        </span>
    </div>
  )
}

import React from 'react'
import GLOBALCOLOR from "../../GLOBAL"
import { AppstoreOutline, UnorderedListOutline } from 'antd-mobile-icons'
import "./tabbar.css"
import { useNavigate } from 'react-router-dom';
import { changelisttyleindex } from '../../store/otherstate';
import { useSelector, useDispatch } from 'react-redux';
export default function Tabbar(props) {
  const navigate = useNavigate();
  const backClick = () => {
    navigate(-1)
  }
  const lsittypeindex = useSelector(state => state.othermsg).listtyleindex
  const dispatch = useDispatch()
  return (
    <div className='tabbarcontainer'>
      <span className='back' style={{ display: props.back ? "inline-block" : "none" }} onClick={() => backClick()}> {`<`}</span>
      <div className='tabbar' style={{ backgroundColor: window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR }}>
        <span className='tabbartitle' style={{ marginLeft: props.back ? "-0.5rem" : "0rem" }}>
          {props.context}
        </span></div>
      <span className='listtype' style={{ display: props.listtype ? "inline-block" : "none"}} onClick={() => dispatch(changelisttyleindex(1))} >
        {
          lsittypeindex % 2 == 1 ?<AppstoreOutline /> :<UnorderedListOutline />  
        } </span>

    </div>

  )
}

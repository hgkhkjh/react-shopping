import React, { useState } from 'react'
import Tabbar from '../../components/tabbar/tabbar'
import Avatarig from "../../coverimg/ava.png"
import { ImageViewer, Modal,Toast } from 'antd-mobile'
import { useDispatch } from 'react-redux';
import IPURL from "../../network/IPURL"
import { changeislogin } from "../../store/otherstate"
import { changegalcolor } from "../../store/otherstate"
import BaseResquest from "../../network/Baseurl"
import GLOBALCOLOR from "../../GLOBAL"
import "./mine.css"
import {
  useNavigate

} from "react-router-dom"
export default function Mine() {
  const [visible, setVisible] = useState(false)

  const [globalcolor, setglobalcolor] = useState(window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const colorinoutcag = (e) => {
    window.localStorage.setItem("globalcolor", e.target.value)
    dispatch(changegalcolor(e.target.value))
    setglobalcolor(window.localStorage.getItem("globalcolor"))
  }
  function copy(str) {
    var save = function (e) {
      e.clipboardData.setData('text/plain', '005-2211');//clipboardData对象
      e.preventDefault();//阻止默认行为
    };
    document.addEventListener('copy', save);
    return document.execCommand("copy");//使文档处于可编辑状态，否则无效
  }
  const upcollect=()=>{
    navigate(`/Collect`)
  }
  const contact = () => {
    Modal.show({
      content: '005-2211',
      closeOnAction: true,
      closeOnMaskClick: true,
      actions: [
        {
          key: 'copy',
          text: '复制',
          style: { color: globalcolor },
          onClick: () => {
            //pc端
            // navigator.clipboard.writeText('005-2211');
            copy()
          }
        }
      ]
    })
  }

  const logout=()=>{
    BaseResquest({
      url: IPURL + `users/logout`,
      method: "post",
      data:window.localStorage.getItem("token")

  }).then((res) => {
      window.localStorage.removeItem("token")
      dispatch(changeislogin(false))
      Toast.show({
          maskStyle: { fontSize: "1.5rem" },
          content: (() => { return (<div style={{ fontSize: "1.5rem" }}>退出成功</div>) })(),
      })
      navigate(`/Homepage`)
  }).catch((res) => {
      console.log(res);
  })
  }
  console.log(globalcolor);

  return (
    <div >
      <Tabbar context="我的"></Tabbar>
      <ImageViewer
        image={Avatarig}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      />
      <div className='avacontainer' >
        <img src={Avatarig} className="avacover" />
        <img className="avaimg" style={{ zIndex: 99 }} object-fit="cover" src={Avatarig} onClick={() => {
          setVisible(true)
        }} />

        <p>万事胜意</p>
      </div>
      <div className='minecontext' style={{ color: globalcolor }}>
        <ul >
          <li onClick={() => { upcollect() }} >我的收藏1</li>
          <li>改变主题颜色
            <input type="color" value={globalcolor} onChange={(e) => colorinoutcag(e)}></input>
          </li>
          <li onClick={() => { contact() }}  >联系我们</li>
          <li>关于我们</li>
          <li onClick={()=>logout()}>退出登录</li>
        </ul>
      </div>
    </div>
  )
}

import React, { useState }  from 'react'
import { TabBar } from 'antd-mobile'
import GLOBALCOLOR from "../../GLOBAL"
import Style from "./footerstyle"
import { useSelector } from 'react-redux';
import {
    useNavigate,
    useLocation
} from "react-router-dom"

import {
    AppOutline,
    TruckOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
export default function Footer(props) {
  const cartmsg = useSelector(state => state.othermsg)
//   const [globalcolor, setglobalcolor] = useState(window.localStorage.getItem("globalcolor")??GLOBALCOLOR)
    const navigate = useNavigate();
    const location = useLocation();
    const tabs = [
        {
            key: '/Homepage',
            title: '首页',
            icon: <AppOutline />,
            path: "/Homepage"
        },
        {
            key: '/Classify',
            title: '分类',
            icon: <UnorderedListOutline />,
            path: "/Classify"

        },
        {
            key: '/Shopcart',
            title: '购物车',
            icon:
                <TruckOutline />,
            path: "/Shopcart"

        },
        {
            key: '/Mine',
            title: '我的',
            icon: <UserOutline />,
            path: "/Mine"

        },
    ]
    const setRouteActive = (value) => {
        navigate(value)
        // const location = useLocation()
        // history.push(value)
    }
    return (
        <Style color={ cartmsg.galcolor}>
            <TabBar style={{
                position: "fixed",
                bottom: 0,
                width: '100%',
                backgroundColor: "#ffff",

                display: location.pathname === "/Productdetails"||location.pathname==="/Productlist" ? "none" : "inline-block",
            }}
                // defaultActiveKey={"Homepage"}
                activeKey={location.pathname}
                onChange={value => setRouteActive(value)}

            >
                {tabs.map(item => {
                    return <TabBar.Item key={item.key} icon={item.icon} title={item.title} >
                    </TabBar.Item>
                }
                )}
            </TabBar>
        </Style>
    )
}

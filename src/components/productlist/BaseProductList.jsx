import React from 'react'
import { Image } from 'antd-mobile'

import GLOBALCOLOR from "../../GLOBAL"
import {
    useNavigate
} from "react-router-dom"
export default function BaseProductList(props) {
    const navigate = useNavigate();
    const upproductdetail = (item) => {
        navigate(`/Productdetails?goods_id=${item.goods_id}`)
    }
    return (
        <>
            {
                props.prodyctlistdatas.map((item, index) => {

                    return <div className='product' style={{ display: props.lsittypeindex % 2 === 1 ? "block" : "grid", }} key={item.goods_id} onClick={() => upproductdetail(item)}>
                        <div className='producticon'>
                            <Image height={props.lsittypeindex % 2 === 1 ? "22rem" : "16rem"} width={props.lsittypeindex % 2 === 1 ? "22rem" : "16rem"} src={item.goods_big_logo ?? ""}></Image>
                        </div>
                        <div className='productdes'>
                            <div className='producttitle'>
                                <span className='producttitlespan' style={{
                                    display: props.lsittypeindex % 2 === 1 ? "block" : null,
                                    whiteSpace: props.lsittypeindex % 2 === 1 ? "nowrap" : null
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
            }
        </>
    )
}

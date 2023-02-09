import React, { useEffect } from 'react'
import { Checkbox, Stepper, Image, SwipeAction, Empty, Dialog, Toast } from 'antd-mobile'
import { FrownOutline } from 'antd-mobile-icons'
import {  useDispatch } from 'react-redux';
import GLOBALCOLOR from "../../GLOBAL"
import {
    useNavigate

} from "react-router-dom"
import { deteproductmsg, checkclick, handelnum } from "../../store/cart"
export default function Productlist(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cartupdetail = (item) => {
        navigate(`/Productdetails?goods_id=${item.goods_id}`)
    }
    useEffect(() => {
    }, [])
    console.log(" props.productsmsg props.productsmsg", props.productsmsg)
    return (
        <>{
            props.productsmsg ?
                <div className='cartcontainer'>
                    {
                        props.productsmsg.length === 0 ?
                            // 没有商品时
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
                                description='还没有添加商品'
                            />
                            :
                            props.productsmsg.map((item, index) => {
                                //  删除商品
                                return <SwipeAction rightActions={props.isdelete ? [
                                    {
                                        key: 'delete',
                                        text: '删除  ',
                                        color: 'danger',
                                        onClick: async () => {
                                            const result = await Dialog.confirm({
                                                content: '确定删除吗',
                                            })
                                            if (result) {
                                                Toast.show({ content: '删除成功' })
                                                dispatch(deteproductmsg(index))
                                            } else {
                                            }
                                        }
                                    }
                                ] : null} key={item.goods_id}> <div className='cartitem'>
                                        {
                                            props.checked ? <Checkbox checked={props.productsmsg[index].checked ?? false} onChange={() => { dispatch(checkclick(index)); }} /> : null
                                        }

                                        <div className='cartitemimg' onClick={() => cartupdetail(item)}>
                                            <Image width="16rem" height="16rem" src={item.goods_big_logo} ></Image>
                                        </div>
                                        <div className='cartitemtitle'>
                                            <div className='cartitemtitlespan' onClick={() => cartupdetail(item)}>
                                                {item.goods_name}
                                            </div>
                                            <div className='cartitemprice'>
                                                <span style={{ color: window.localStorage.getItem("globalcolor") ?? GLOBALCOLOR }}>
                                                    ￥{item.goods_price}
                                                </span>
                                                {
                                                    props.showsum ?
                                                        <Stepper
                                                            min={1}
                                                            defaultValue={item.num ?? 1}
                                                            onChange={value => {
                                                                dispatch(handelnum({ value, index }))
                                                            }}
                                                        /> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </SwipeAction>
                            })
                    }
                </div> : null
        }  </>


    )
}

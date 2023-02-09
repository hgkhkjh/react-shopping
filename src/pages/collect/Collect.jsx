import React from 'react'
import Tabbat from "../../components/tabbar/tabbar"
import { useSelector } from 'react-redux';
import {  Empty } from 'antd-mobile'
import { FrownOutline } from 'antd-mobile-icons'
import BaseProductList from "../../components/productlist/BaseProductList"
import {
    useNavigate

} from "react-router-dom"
export default function Collect() {
    const navigate = useNavigate();
    const lsittypeindex = useSelector(state => state.othermsg).listtyleindex
    const collectmsg = useSelector(state => state.collectmsg).collectmsg
    const upproductdetail = (item) => {
        console.log(item);
        navigate(`/Productdetails?goods_id=${item.goods_id}`)
    }
    return (
        <div>
            <Tabbat listtype back={true} context={"我的收藏"}></Tabbat>
            <div className='collectcontext' style={{
                display: lsittypeindex % 2 === 1 && collectmsg.length !== 0 ? "grid" : null,
                gridTemplateColumns: "1fr 1fr",
                justifyItems: "center"
            }}>
                {collectmsg.length === 0 ?
                    <Empty
                        style={{ padding: '5rem 0' }}
                        image={
                            <FrownOutline
                                style={{
                                    color: 'var(--adm-color-light)',
                                    fontSize: 48,
                                }}
                            />
                        }
                        description='还没有收藏的商品'
                    />
                    :
                    <BaseProductList prodyctlistdatas={collectmsg} lsittypeindex={lsittypeindex}></BaseProductList>

                }
            </div>
        </div>
    )
}

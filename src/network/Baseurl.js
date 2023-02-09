import axios from "axios";
import { SideBar, SpinLoading, Toast } from 'antd-mobile'
export default function BaseResquest(resquestmsg) {
    const instance = axios.create({
        baseURL: "https://api-hmugo-web.itheima.net/api/public/v1" //基础路径
    })
    instance.interceptors.request.use(config => {  // const token = localStorage.token
        Toast.show({
            maskStyle: { fontSize: "1.5rem" },
            duration:0,
            content: (() => { return (<div style={{ fontSize: "1.5rem",textAlign:"center",padding:"0rem 2rem" }}><SpinLoading style={{ '--size': '5rem',marginBottom:"1rem" }}/>加载中 </div>) })(),

        })
        return config
    },
        error => {
            // 请求失败
            return Promise.reject(error)
        })
    instance.interceptors.response.use(
        response => {
            // dataAxios 是 axios 返回数据中的 data
            Toast.clear()
            return response
        },
        error => {
            // 响应错误

            return Promise.reject(error)
        })
    return instance(resquestmsg)
}


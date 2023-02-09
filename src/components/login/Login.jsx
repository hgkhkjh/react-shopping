import React, {  useState } from 'react'
import { useRef } from 'react'
import coverurl from "../../coverimg/cover.png"
import GLOBALCOLOR from "../../GLOBAL"
import IPURL from "../../network/IPURL"
import BaseResquest from "../../network/Baseurl"
import { changeislogin } from "../../store/otherstate"
import { useSelector, useDispatch } from 'react-redux';
// import VerificationCode from '../VerificationCode/VerificationCode'
import { Toast } from 'antd-mobile'
import "./login.css"
export default function Login() {
    const username = useRef(null)
    const password = useRef(null)
    const regusername = useRef(null)
    const regpassword = useRef(null)
    const regtel = useRef(null)
    const regpasswordtoo = useRef(null)

    const dispatch = useDispatch()
    const { islogin } = useSelector(state => state.othermsg)
    const [isregister, setregister] = useState(false)
    const usersubit = () => {
        console.log(username.current.value);
        console.log(password.current.value);
        //提交信息
        let collectstate
        if (username.current.value != "" && password.current.value != "") {
            BaseResquest({
                url: IPURL + `users/login`,
                method: "post",
                data: {
                    userName: username.current.value,
                    userPassword: password.current.value,
                    // window

                }
            }).then((res) => {
                console.log(res);
                console.log(res.data.message);
                if (res.data.code === 500) {
                    collectstate = "用户名不存在或密码错误"
                } else if (res.data.code === 200) {
                    collectstate = "登录成功"
                    dispatch(changeislogin(true))
                    window.localStorage.setItem("token", res.data.message)
                    console.log(islogin);

                }


            }).catch((res) => {
                collectstate = res
                console.log(res);
            }).finally(() => {
                Toast.show({
                    maskStyle: { fontSize: "1.5rem" },
                    content: (() => { return (<div style={{ fontSize: "1.5rem" }}>{collectstate}</div>) })(),

                })
            })
        } else {
            collectstate = "用户名或密码不能为空"

        }
        Toast.show({
            maskStyle: { fontSize: "1.5rem" },
            content: (() => { return (<div style={{ fontSize: "1.5rem" }}>{collectstate}</div>) })(),

        })

    }
    const regsubit = () => {
        let collectstate
        // 设置正则表达式的手机号码格式 规则 ^起点 $终点 1第一位数是必为1  [3-9]第二位数可取3-9的数字  \d{9} 匹配9位数字 
        var reg = /^1[3-9]\d{9}$/
        if (regusername.current.value !== "" && regpassword.current.value !== "" && regtel.current.value !== "")
            if (regusername.current.value.indexOf("/") !== -1 && regusername.current.value.indexOf("<") !== -1 && regpassword.current.value.indexOf("/") !== -1 && regpassword.current.value.indexOf("<") !== -1) {
                collectstate = "用户名或密码有不合法字"
            } else
                if (reg.test(regtel.current.value)) {
                    if (regpasswordtoo.current.value === regpassword.current.value) {
                        console.log("duiudiudi")
                        BaseResquest({
                            url: IPURL + `users/register`,
                            method: "post",
                            data: {
                                userName: regusername.current.value,
                                userPassword: regpassword.current.value,
                                // window
                                userTel: regtel.current.value

                            }
                        }).then((res) => {
                            if (res.data.code === 500) {
                                collectstate = "用户名已经存在"
                            } else if (res.data.code === 200) {
                                console.log(res);
                                collectstate = "注册成功"
                                setregister(false)
                                // console.log(res.data.message);
                                // if (res.data.code === 500) {
                                //     collectstate = "用户名不存在或密码错误"
                                // } else if (res.data.code === 200) {
                                //     collectstate = "登录成功"
                                //     dispatch(changeislogin(true))
                                //     window.localStorage.setItem("token", res.data.message)
                                //     console.log(islogin);
                                // }
                            } else {
                                collectstate = "注册失败"
                            }


                        }).catch(() => {
                            collectstate = "注册失败"
                        }).finally(() => {
                            Toast.show({
                                maskStyle: { fontSize: "1.5rem" },
                                content: (() => { return (<div style={{ fontSize: "1.5rem" }}>{collectstate}</div>) })(),

                            })
                        })
                    } else {
                        collectstate = "两次输入密码不一致"

                    }

                } else {
                    collectstate = "请输入正确的手机号"

                } else {
            collectstate = "不能输入为空"

        }

        Toast.show({
            maskStyle: { fontSize: "1.5rem" },
            content: (() => { return (<div style={{ fontSize: "1.5rem" }}>{collectstate}</div>) })(),

        })
    }
    return (
        <>
            <img width="100%" height="100%" style={{ position: 'fixed', zIndex: "-1" }} src={coverurl}></img>
            <div className="coverimg">
                {/* 登录 */}
                {
                    !isregister ?

                        <div className="logincontainer" style={{ gridTemplateRows: "3fr 3fr 3fr 2fr 3fr " }}>
                            <p className="logintext" style={{ color: GLOBALCOLOR }}>登录</p>
                            <div className="username">
                                <input ref={username} type="text" placeholder="请输入用户名"></input>
                            </div>
                            <div className="password">
                                <input ref={password} type="password" placeholder="请输入密码"></input>
                            </div>
                            <span onClick={() => setregister(true)} style={{ fontSize: "1rem", color: GLOBALCOLOR }}> 立即注册</span>
                            {/* <VerificationCode></VerificationCode> */}
                            <button onClick={usersubit} className="submit" style={{ backgroundColor: GLOBALCOLOR }}> 输入好了</button>
                        </div> :
                        // 注册
                        <div className='registercontainer logincontainer' style={{ gridTemplateRows: "3fr 3fr 3fr 3fr 3fr 2fr 3fr" }}>
                            <p className="logintext" style={{ color: GLOBALCOLOR }}>注册</p>
                            <div className="username">
                                <input ref={regusername} type="text" placeholder="请输入用户名"></input>
                            </div>
                            <div className="username">
                                <input type="password" ref={regpasswordtoo} placeholder="请输入密码"></input>
                            </div>
                            <div className="username">
                                <input ref={regpassword} type="password" placeholder="请再次输入密码"></input>
                            </div>
                            <div className="username">
                                <input ref={regtel} type="number" placeholder="请输入电话号"></input>
                            </div>
                            <span onClick={() => setregister(false)} style={{ fontSize: "0.5rem", color: GLOBALCOLOR }}> 返回</span>
                            <button className="submit" onClick={() => regsubit()} style={{ backgroundColor: GLOBALCOLOR }}> 输入好了</button>
                        </div>
                }

            </div>
        </>
    )
}

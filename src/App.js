import Homepage from "./pages/homepage/Homepage";
import Footer from "./components/footer/footer"
import { Route, useRoutes } from "react-router-dom"
// import routers from "./router/router";
import { useSelector } from 'react-redux';
// import Login from "./components/login/Login";
import Classify from "./pages/classify/Classify";
import Mine from "./pages/mine/Mine";
import Shopcart from "./pages/shopcart/Shopcart.jsx";
import Productdetails from "./pages/productdetails/Productdetails";
import Collect from "./pages/collect/Collect";
import Search from "./pages/search/Search";
import Productlist from "./pages/productlist/Productlist";
import qs from "query-string";
import "./index.css"
import {
  useLocation,
  Routes
} from "react-router-dom"
import KeepAlive from 'react-activation'
import { useEffect } from "react";
function App() {
  const location = useLocation();
  // const element = useRoutes(routers)
  const { islogin } = useSelector(state => state.othermsg)
  const { productlistcid } = useSelector(state => state.othermsg)
 console.log("productlistcid",productlistcid);
  const { search } = useLocation();
  console.log(qs.parse(search));
  //适配rem
  const handelrem = () => {
    const htmlEl = document.documentElement;

    function setRemUnit() {
      // 2.获取html的宽度(视口的宽度)
      const htmlWidth = htmlEl.clientWidth;
      // 3.根据宽度计算一个html的font-size的大小
      const htmlFontSize = htmlWidth / 50;
      // 4.将font-size设置到html上
      htmlEl.style.fontSize = htmlFontSize + "px";
    }
    // 保证第一次进来时, 可以设置一次font-size
    setRemUnit();

    // 当屏幕尺寸发生变化时, 实时来修改html的font-size
    window.addEventListener("resize", setRemUnit);
  }
  
  useEffect(() => {
    handelrem()
    
  }, [])
  console.log(islogin);
  return (
    <>
      {
        // islogin ?
          <div className="App" style={{ marginBottom: location.pathname === "/Productlist" ? "0rem" : "3rem" }}>
            {/* 路由 */}
            <Routes>
              <Route path="/" element={<Homepage />}> </Route>
              <Route path="/Homepage" element={<Homepage />}> </Route>
              <Route path="/Classify" element={<KeepAlive name="classify" id="classify"><Classify /></KeepAlive>}> </Route>
              <Route path="/Mine" element={<Mine />}> </Route>
              <Route path="/Shopcart" element={<Shopcart />}> </Route>
              <Route path="/Productdetails" element={<Productdetails />}> </Route>
              <Route path="/Collect" element={<Collect />}> </Route>
              <Route path="/Search" element={<Search />}> </Route>
              <Route path="/Productlist" element={<KeepAlive name="Productlist" id={productlistcid}><Productlist /></KeepAlive>}> </Route>
            </Routes>
            {/* {element} */}
            {/* 导入页脚 */}
            <Footer ></Footer>
          </div>
          // :
          // <Login></Login>
      //   <div className="App" style={{ marginBottom: location.pathname === "/Productlist" ? "0rem" : "3rem" }}>
      //   {/* 路由 */}
      //   <Routes>
      //     <Route path="/" element={<Homepage />}> </Route>
      //     <Route path="/Homepage" element={<Homepage />}> </Route>
      //     <Route path="/Classify" element={<KeepAlive name="classify" id="classify"><Classify /></KeepAlive>}> </Route>
      //     <Route path="/Mine" element={<Mine />}> </Route>
      //     <Route path="/Shopcart" element={<Shopcart />}> </Route>
      //     <Route path="/Productdetails" element={<Productdetails />}> </Route>
      //     <Route path="/Collect" element={<Collect />}> </Route>
      //     <Route path="/Search" element={<Search />}> </Route>
      //     <Route path="/Productlist" element={<KeepAlive name="Productlist" id={productlistcid}><Productlist /></KeepAlive>}> </Route>
      //   </Routes>
      //   {/* {element} */}
      //   {/* 导入页脚 */}
      //   <Footer ></Footer>
      // </div>
      }
    </>
  );
}

export default App;

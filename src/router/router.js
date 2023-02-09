import Homepage from "../pages/homepage/Homepage";
import Classify from "../pages/classify/Classify";
import Mine from "../pages/mine/Mine";
import Shopcart from "../pages/shopcart/Shopcart.jsx";
import Productdetails from "../pages/productdetails/Productdetails";
import Collect from "../pages/collect/Collect";
import Search from "../pages/search/Search";
import { Navigate } from 'react-router-dom'
import Productlist from "../pages/productlist/Productlist";
import KeepAlive from 'react-activation'
import qs from "query-string";


export default [
    {
        path: "/Homepage",
        element: <Homepage></Homepage>
    },
    {
        path: "/Classify",
        element:
            <KeepAlive id="Classify" name="Classify">
                <Classify></Classify>
            </KeepAlive>
    },
    {
        path: "/Mine",
        element: <Mine></Mine>
    }
    ,
    {
        path: "/Productlist",
        element:
            <KeepAlive id="Productlist" name="Productlist">
                <Productlist></Productlist>
            </KeepAlive>

    },
    {
        path: "/Productdetails",
        element: <Productdetails></Productdetails>
    },
    {
        path: "/Search",
        element: <Search></Search>
    },
    {
        path: "/Collect",
        element: <Collect></Collect>
    },
    {
        path: "/Shopcart",
        element: <Shopcart></Shopcart>
    }, {
        path: "/",
        element: <Navigate to="/Homepage"></Navigate>
    },
]
import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import { Navigate, Outlet } from "react-router-dom"


export const PrivateRoute = () => {
    const { user } = useContext(ShopContext)
    if(user.isVerified){
        return <Outlet/>
    }else{
        return  <Navigate to={'/'}/>
    }
}

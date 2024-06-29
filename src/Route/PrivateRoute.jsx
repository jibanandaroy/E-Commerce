import {  useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import axios from "axios"
import ReactLoading from 'react-loading';
import './RouteCSS/PrivateRoute.css'

export const PrivateRoute = () => {
   const [user, setUser] = useState({
      data: null,
      loading: true,
      error: null
   })
   useEffect(() => {
      (async () => {
         try {
            setUser((prev) => ({ ...prev, loading: true }))
            const res = await axios.get('/api/auth/profile')
            if(res.data.success) setUser((prev) => ({ ...prev, data: res.data.data}))
         } catch (error) {
            setUser((prev) => ({ ...prev, error: error, loading: false }))
         } finally {
            setUser((prev) => ({ ...prev, loading: false }))
         }

      })()
   }, [])
   if (user.loading) return <Outlet />
   // if (user.loading) return <div className="loader"><ReactLoading type={"spinningBubbles"} color={"black"} height={467} width={150} /></div> 
   if (!user.data) return  <Navigate to={'/'} />

   return <Outlet />

}

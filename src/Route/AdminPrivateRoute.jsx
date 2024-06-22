import {  useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import axios from "axios"

export const AdminPrivateRoute = () => {
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

   if (user.loading) return <div> Loading .... </div>
   if (!user.role===1) return  <Navigate to={'/'} />

   return <Outlet />

}

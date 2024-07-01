import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated'
import ProtectedRoute from './protected/ProtectedRoute'
import Skelton1 from '../Pages/Skelton1'

const AcademyManage  = lazy(()=> import('../Components/admin/Academy management/AcademyManage'))
const  Home_Admin = lazy(()=> import('../Components/admin/Home_Admin'))
const  Admin_login = lazy(()=> import('../Components/admin/Admin_login'))
const  PlayerManage = lazy(()=> import('../Components/admin/PlayerManage'))


const AdminRoutes = () => {
  return (
    <Suspense fallback={<Skelton1/>}>
      <Routes>
          <Route path="/login" element={<RedirectIfAuthenticated element={<Admin_login/>} redirectTo={'/admin/home'} />}/>
          <Route path="/home" element={<ProtectedRoute element={<Home_Admin/>} role={"admin"} />}/>
          <Route path="/academyview" element={<ProtectedRoute element={<AcademyManage/>} role={"admin"} />}/>
          <Route path="/playerview" element={<ProtectedRoute element={<PlayerManage/>} role={"admin"} />}/>
      </Routes>
    </Suspense>
  )
}

export default AdminRoutes

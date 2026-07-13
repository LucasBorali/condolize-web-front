import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import RegisterCondo from "../pages/RegisterCondo"
import AdminPanel from "../pages/app/AdminPanel"
import { ProtectedRoute } from "../components/ProtectedRoute"
import AdminLayout from "../layout/AdminLayout"
import Units from "../pages/app/Units"
import Users from "../pages/app/Users"
import Residents from "../pages/app/Residents"
import PublicSpaces from "../pages/app/PublicSpace"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterCondo />} />
      <Route path="/admin-panel" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
        } >
           <Route index element={<AdminPanel />} />
            <Route path="units" element={<Units />} />
            <Route path="users" element={<Users />} />
            <Route path="residents" element={<Residents />} />
            <Route path="public-spaces" element={<PublicSpaces />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes
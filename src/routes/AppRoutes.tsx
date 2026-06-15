import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import RegisterCondo from "../pages/RegisterCondo"
import AdminPanel from "../pages/app/AdminPanel"
import { ProtectedRoute } from "../components/ProtectedRoute"
import AdminLayout from "../layout/AdminLayout"
import Units from "../pages/app/Units"

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
            {/* <Route path="reservations" element={<Reservations />} />
            <Route path="maintenance" element={<Maintenance />} /> */}
        </Route>
    </Routes>
  )
}

export default AppRoutes
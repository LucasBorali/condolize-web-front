import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import RegisterCondo from "../pages/RegisterCondo"
import AdminPanel from "../pages/app/AdminPanel"
import { ProtectedRoute } from "../components/ProtectedRoute"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterCondo />} />
      <Route path="/admin-panel" element={
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
        } />
    </Routes>
  )
}

export default AppRoutes
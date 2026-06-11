import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"
import classes from "./AdminLayout.module.css"

const AdminLayout = () => {
  return (
    <div className={classes["admin-layout"]}>
            <Sidebar />

            <main className={classes.content}>
                <Outlet />
            </main>
        </div>
  )
}

export default AdminLayout
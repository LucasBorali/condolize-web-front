import { Link } from "react-router-dom"
import classes from "./Sidebar.module.css"

const Sidebar = () => {
  return (
    <nav className={classes.sidebar}>
        <ul>
            <li><Link to="">Início</Link></li>
            <li><Link to="units">Unidades</Link></li>
            <li><Link to="users">Usuários</Link></li>
            <li><Link to="reservations">Reservas</Link></li>
            <li><Link to="maintenance">Manutenção</Link></li>
            
        </ul>
    </nav>
  )
}

export default Sidebar
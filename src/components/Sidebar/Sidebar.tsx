import classes from "./Sidebar.module.css"

const Sidebar = () => {
  return (
    <nav className={classes.sidebar}>
        <ul>
            <li>Início</li>
            <li>Moradores</li>
            <li>Reservas</li>
            <li>Manutenção</li>
        </ul>
    </nav>
  )
}

export default Sidebar
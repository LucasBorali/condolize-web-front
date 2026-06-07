import { Link } from "react-router-dom"
import classes from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
        <h1>Condolize</h1>
        <div>
          <Link to="/login" className={classes.loginBtn}>Log in</Link>
          <Link to="/register" className={classes.registerBtn}>Registrar condomínio</Link>
        </div>
       
    </nav>
  )
}

export default Navbar
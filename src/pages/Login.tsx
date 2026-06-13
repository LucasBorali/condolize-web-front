import { useState } from "react";
import { login, me } from "../api/authApi";
import {useAuth} from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Form.module.css";


const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginHandler= async () => {


    try{
      const result = await login({
            email,
            password
          });

          localStorage.setItem("token", result.token);

          const currentUser = await me();
         
         auth.login(currentUser);
        navigate("/admin-panel");

    }catch(error){
      console.error("Login failed", error);
    }

    

}

  return (
    <div className={classes["form-container"]}>
    <form onSubmit={(e) => {
      e.preventDefault();
      loginHandler();
    }}>
      <h1>Seja bem vindo de volta!</h1>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Digite seu email"/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Digite a senha"/>
      </div>
      <button type="submit">Login</button>

    </form>
    <div>
        <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
    </div>
    </div>
  )
}

export default Login
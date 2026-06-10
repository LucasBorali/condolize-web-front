import { useState } from "react";
import { login, me } from "../api/authApi";
import {useAuth} from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


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
    <form onSubmit={(e) => {
      e.preventDefault();
      loginHandler();
    }}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>

    </form>
  )
}

export default Login
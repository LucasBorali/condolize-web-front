import { useState } from "react";
  import { login, me } from "../api/authApi";

const Login = () => {
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

          console.log(currentUser);

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
import { useState } from "react";
import { me, register } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import classes from "./Form.module.css";

const RegisterCondo = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  const [associationName, setAssociationName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandler = async () => {

    if (password !== confirmPassword) {
        alert("As senhas não conferem.");
        return;
    }

    try {

        const result = await register({
            associationName,
            adminName,
            email,
            password
        });

        localStorage.setItem("token", result.token);

        const currentUser = await me();

        auth.login(currentUser);

        navigate("/admin-panel");

    } catch (error) {
        console.error(error);
    }
};

  return (
     <div className={classes["form-container"]}>
    <form onSubmit={(e) => {
    e.preventDefault();
    registerHandler();
}}>
     <h1>Dê o primeiro passo no gerenciamento da sua Associação</h1>
    <div>
        
           
        
        
        <label>Associação:</label>
        <input
            value={associationName}
            onChange={(e) => setAssociationName(e.target.value)}
            required
            placeholder="Nome da associação de moradores"
        />
    </div>

    <div>
        <label>Administrador:</label>
        <input
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
            placeholder="Nome do síndico ou responsável"
        />
    </div>

    <div>
        <label>E-mail: </label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="E-mail de contato para a associação"
        />
    </div>

    <div>
        <label>Senha:</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Crie uma senha segura para a associação"
        />
    </div>

    <div>
        <label>Confirmar Senha:</label>
        <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirme a senha para garantir que está correta"
        />
    </div>

    <button type="submit">
        Criar Associação
    </button>
</form>
<div>
    <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
</div>
</div>
  )
}

export default RegisterCondo
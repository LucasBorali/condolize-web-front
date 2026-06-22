import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User";
import { createUser, getUsers } from "../../api/userApi";
import classes from "./Users.module.css";

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(0);



    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };
    console.log(users);

    const createUserHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        // Call the API to create a new user
        try {
            await createUser({ name, email, password: "", role });
            setEmail(""); // Clear the input field
            await fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error creating user:", error);
        }
        
    };

  return (
    <div>
        <div className={classes["create-user-container"]}>
        <h1>Cadastrar novo usuário</h1>
    <form onSubmit={(e) => createUserHandler(e)} className={classes["create-user-form"]}>
        <div className={classes["create-user-inputs"]}>

       
    <input className={classes["create-user-input"]}
  value={name}
  onChange={(e) => setName(e.target.value)} />
    <input className={classes["create-user-input"]}
  value={email}
  onChange={(e) => setEmail(e.target.value)} />
  <select className={classes["create-user-input"]} value={role} onChange={(e) => setRole(Number(e.target.value))}>
    <option value={0}>Usuário</option>
    <option value={1}>Administrador</option>
  </select>
    </div>
  <button type="submit">Adicionar</button>
    </form>
    </div>

    <div className={classes["create-user-container"]}>
    <h1>Lista de usuários</h1>
    

        {loading ? (
            <p>Carregando usuários...</p>
        ) : users.map(user => (
            <div key={user.id}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Users
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
    const [saving, setSaving] = useState(false);



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
  
    const createUserHandler = async (e: React.FormEvent) => {
        e.preventDefault();
         if (saving) return;

        if (!name.trim()) return;
        if (!email.trim()) return;
       

        // Call the API to create a new user
        try {
            setSaving(true);
            await createUser({ name, email, password: "", role });
            setName("");
            setEmail(""); // Clear the input field
            setRole(0); // Reset the role selection
            await fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setSaving(false);
        }
        
    };

  return (
    <div>
        <div className="container">
        <h1>Cadastrar novo usuário</h1>
    <form onSubmit={(e) => createUserHandler(e)} className={classes["create-user-form"]}>
        <div className={classes["create-user-inputs"]}>

       
    <input className={classes["create-user-input"]}
  value={name}
  placeholder="Nome"
  onChange={(e) => setName(e.target.value)} />
    <input className={classes["create-user-input"]}
  value={email}
  placeholder="Email"
  onChange={(e) => setEmail(e.target.value)} />
  <select className={classes["create-user-input"]} value={role} onChange={(e) => setRole(Number(e.target.value))}>
    <option value={0}>Usuário</option>
    <option value={1}>Administrador</option>
  </select>
    </div>
  <button type="submit" disabled={saving} className="standard-button">
    {saving ? "Adicionando..." : "Adicionar"}
  </button>
    </form>
    </div>

    <div className="container">
    <h1>Lista de usuários</h1>
    

        {loading ? (
            <p>Carregando usuários...</p>
        ) : (
            <table className={classes["users-table"]}>
           <thead>
    <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Perfil</th>
        <th>Ações</th>
    </tr>
</thead>

<tbody>
    {users.map(user => (
        <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <button className="standard-button">Editar</button>
                <button className="standard-button">Excluir</button>
            </td>
        </tr>
    ))}
</tbody>
        </table>
        )}
        </div>
    </div>
  )
}

export default Users
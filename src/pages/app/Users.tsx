import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User";
import { createUser, deleteUser, getUsers, updateUser } from "../../api/userApi";


const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(0);
    const [saving, setSaving] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);



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
  
    const createUserHandler = async (e: React.SubmitEvent) => {
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

    const editUserHandler =  (user: User) => {
        setEditingUserId(user.id)

        setName(user.name);
        setEmail(user.email);

         if (user.role === "Admin")
        setRole(1);
    else
        setRole(0);
    }

    const saveUserHandler = async (e: React.SubmitEvent) => {

        e.preventDefault

         if (!editingUserId)
        return;

    try {

        await updateUser(
            editingUserId,
            {
                name,
                email,
                role
            });

        resetForm();

        await fetchUsers();

    } catch (error) {
        console.error(error);
    }

    }

    const resetForm = () => {

    setEditingUserId(null);

    setName("");
    setEmail("");
    setRole(0);
};

    const deleteUserHandler = async (id: string ) => {
        const confirmed = window.confirm("Deseja realmente excluir esse usuário?")

        if(!confirmed)
            return

        try {
            await deleteUser(id)

            await fetchUsers()
        }
        catch (error: any) {
            const message = error.response?.data ?? "Erro ao exxcluir usuário"

           alert(message)
        }
    }

  return (
    <div>
        <div className="container">
        <h1>Cadastrar novo usuário</h1>
    <form onSubmit={(e) => editingUserId
            ? saveUserHandler(e)
            : createUserHandler(e)} className="standard-form">
        <div className="standard-inputs">

       
    <input className="standard-input"
  value={name}
  placeholder="Nome"
  onChange={(e) => setName(e.target.value)} />
    <input className="standard-input"
  value={email}
  placeholder="Email"
  onChange={(e) => setEmail(e.target.value)} />
  <select className="standard-input" value={role} onChange={(e) => setRole(Number(e.target.value))}>
    <option value={0}>Usuário</option>
    <option value={1}>Administrador</option>
  </select>
    </div>
  <button type="submit" disabled={saving} className="standard-button">
    {editingUserId
            ? "Salvar"
            : "Adicionar"}
  </button>
    </form>
    </div>

    <div className="container">
    <h1>Lista de usuários</h1>
    

        {loading ? (
            <p>Carregando usuários...</p>
        ) : (
            <table className="standard-table">
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
                <button onClick={() => editUserHandler(user)} className="standard-button">Editar</button>
                <button onClick={() => deleteUserHandler(user.id)} className="standard-button">Excluir</button>
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
import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User";
import { createUser, getUsers } from "../../api/userApi";

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");



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
        if (!email.trim()) return;

        // Call the API to create a new user
        try {
            await createUser({ email });
            setEmail(""); // Clear the input field
            await fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error creating user:", error);
        }
        
    };

  return (
    <div>
        <h1>Usuários</h1>
    <form onSubmit={(e) => createUserHandler(e)}>
    <input
  value={email}
  onChange={(e) => setEmail(e.target.value)} />
  <button type="submit">Adicionar</button>
    </form>
    

        {loading ? (
            <p>Carregando usuários...</p>
        ) : users.map(user => (
            <div key={user.id}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        ))}
    </div>
  )
}

export default Users
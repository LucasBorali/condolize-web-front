import { useAuth } from "../../hooks/useAuth";


const AdminPanel = () => {
    const { user } = useAuth();


  return (
   <> 
    <h1>Seja bem vindo, {user?.name}</h1>

            <p>Email: {user?.email}</p>

            <p>Role: {user?.role}</p>

            <p>Association: {user?.associationId}</p>
   </>
  )
}

export default AdminPanel
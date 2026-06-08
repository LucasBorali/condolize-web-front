import { useAuth } from "../../hooks/useAuth";


const Dashboard = () => {
    const { user } = useAuth();


  return (
   <> 
    <h1>Dashboard</h1>

            <p>Email: {user?.email}</p>

            <p>Role: {user?.role}</p>

            <p>Association: {user?.associationId}</p>
   </>
  )
}

export default Dashboard
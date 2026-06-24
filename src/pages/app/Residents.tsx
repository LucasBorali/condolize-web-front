import { useEffect, useState } from "react";
import type { Resident } from "../../interfaces/Resident";
import type { User } from "../../interfaces/User";
import type { Unit } from "../../interfaces/Unit";
import { createResident, getResidents } from "../../api/residentApi";
import { getUnits } from "../../api/unitsApi";
import { getUsers } from "../../api/userApi";


    const Residents = () => {

        const [users, setUsers] = useState<User[]>([]);
        const [units, setUnits] = useState<Unit[]>([]);
        const [loading, setLoading] = useState(false);
        const [residents, setResidents] = useState<Resident[]>([]);

        const [userId, setUserId] = useState("");
        const [unitId, setUnitId] = useState("");

        useEffect(() => {
            loadData();
        }, []);
        
        const loadData = async () => {
            setLoading(true);
            const [userResult, unitResult, residentResult] = await Promise.all([
                getUsers(),
                getUnits(),
                getResidents()
            ]);
            setUsers(userResult);
            setUnits(unitResult);
            setResidents(residentResult);
            setLoading(false);
        }

        const createResidentHandler = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!userId || !unitId) return;

            await createResident({ userId, unitId });
            
            setUserId("");
            setUnitId("");

            await loadData();
        }

    return (
        <div>

            <div className="container">
                <h1>Vincular Morador</h1>

                <form onSubmit={createResidentHandler}>

                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        <option value="">
                            Selecione um usuário
                        </option>

                        {users.map(user => (
                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={unitId}
                        onChange={(e) => setUnitId(e.target.value)}
                    >
                        <option value="">
                            Selecione uma unidade
                        </option>

                        {units.map(unit => (
                            <option
                                key={unit.id}
                                value={unit.id}
                            >
                                {unit.identifier}
                            </option>
                        ))}
                    </select>

                    <button type="submit">
                        Vincular
                    </button>

                </form>
            </div>

            <div className="container">
                <h1>Moradores</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Morador</th>
                            <th>Unidade</th>
                        </tr>
                    </thead>

                    <tbody>
                        {residents.map(resident => (
                            <tr
                                key={`${resident.userId}-${resident.unitId}`}
                            >
                                <td>{resident.userName}</td>
                                <td>{resident.unitIdentifier}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
    }

    export default Residents
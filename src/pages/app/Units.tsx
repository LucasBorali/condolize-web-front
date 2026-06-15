import { useEffect, useState } from "react";
import type { Unit } from "../../interfaces/Unit";
import { getUnits } from "../../api/unitsApi";

const Units = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchUnits = async () => {
        try {
            const data = await getUnits();
            setUnits(data);
        } catch (error) {
            console.error("Error fetching units:", error);
        } finally {
            setLoading(false);
        }
    };




  return (
    <div>
        <h1>Unidades</h1>
        {loading ? (
            <p>Carregando unidades...</p>
        ) : units.map(unit => (
        <div key={unit.id}>
          <h3>{unit.identifier}</h3>
          <p>{unit.residentCount} morador(es)</p>
        </div>
      ))}
        
    </div>
  )
}

export default Units
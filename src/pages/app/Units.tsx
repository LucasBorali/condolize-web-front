import { useEffect, useState } from "react";
import type { Unit } from "../../interfaces/Unit";
import { createUnit, getUnits } from "../../api/unitsApi";

const Units = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
    const [identifier, setIdentifier] = useState("");

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

const createUnitHandler = async () => {
     if (!identifier.trim())
    return;

  await createUnit(identifier);

  setIdentifier("");

  await fetchUnits();
}


  return (
    <div>
      <div className="container">
        <h1>Cadastrar unidade</h1>
        
        <form>
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <button onClick={createUnitHandler}>
          Adicionar
        </button>

    </form>
      </div>
      <div className="container">
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
    </div>
  )
}

export default Units
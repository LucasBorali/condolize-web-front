import { useEffect, useState } from "react";
import type { PublicSpace } from "../../interfaces/PublicSpace";
import {
    getPublicSpaces,
    createPublicSpace,
    updatePublicSpace,
    deletePublicSpace
} from "../../api/publicSpaceApi";

const PublicSpaces = () => {

    const [spaces, setSpaces] = useState<PublicSpace[]>([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState(0);

    const [amenitiesText, setAmenitiesText] = useState("");

    const [isActive, setIsActive] = useState(true);

    const [editingId, setEditingId] =
        useState<string | null>(null);

    useEffect(() => {
        fetchSpaces();
    }, []);

    const fetchSpaces = async () => {
        const result = await getPublicSpaces();
        setSpaces(result);
    };

    const resetForm = () => {
        setEditingId(null);

        setName("");
        setDescription("");
        setCapacity(0);
        setAmenitiesText("");
        setIsActive(true);
    };

    const saveHandler = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        const amenities = amenitiesText
            .split(",")
            .map(x => x.trim())
            .filter(x => x);

        if (editingId) {

            await updatePublicSpace(
                editingId,
                {
                    name,
                    description,
                    capacity,
                    amenities,
                    isActive
                });

        } else {

            await createPublicSpace({
                name,
                description,
                capacity,
                amenities
            });

        }

        resetForm();
        await fetchSpaces();
    };

    const editHandler = (
        space: PublicSpace
    ) => {

        setEditingId(space.id);

        setName(space.name);
        setDescription(space.description);
        setCapacity(space.capacity);

        setAmenitiesText(
            space.amenities.join(", ")
        );

        setIsActive(space.isActive);
    };

    const deleteHandler = async (
        id: string
    ) => {

        const confirmed =
            window.confirm(
                "Deseja excluir este espaço?"
            );

        if (!confirmed)
            return;

        await deletePublicSpace(id);

        await fetchSpaces();
    };

    return (
        <div>

            <div className="container">

                <h1>
                    Comodidades
                </h1>

                <form
                    onSubmit={saveHandler}
                    className="standard-form"
                >

                    <div className="standard-inputs">

                        <input
                            className="standard-input"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            className="standard-input"
                            placeholder="Descrição"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            className="standard-input"
                            type="number"
                            placeholder="Capacidade"
                            value={capacity}
                            onChange={(e) =>
                                setCapacity(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        />

                        <input
                            className="standard-input"
                            placeholder="Geladeira, Wi-Fi, Freezer"
                            value={amenitiesText}
                            onChange={(e) =>
                                setAmenitiesText(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        className="standard-button"
                    >
                        {editingId
                            ? "Salvar"
                            : "Adicionar"}
                    </button>

                </form>

            </div>

            <div className="container">

                <h1>
                    Espaços cadastrados
                </h1>

                <table className="standard-table">

                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Capacidade</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>

                        {spaces.map(space => (

                            <tr key={space.id}>

                                <td>
                                    {space.name}
                                </td>

                                <td>
                                    {space.capacity}
                                </td>

                                <td>
                                    {space.isActive
                                        ? "Ativo"
                                        : "Inativo"}
                                </td>

                                <td>

                                    <button
                                        className="standard-button"
                                        onClick={() =>
                                            editHandler(
                                                space
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="standard-button"
                                        onClick={() =>
                                            deleteHandler(
                                                space.id
                                            )
                                        }
                                    >
                                        Excluir
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default PublicSpaces;
import { useEffect, useState } from "react";

import type { User } from "../../interfaces/User";
import type { PublicSpace } from "../../interfaces/PublicSpace";
import type { Reservation } from "../../interfaces/Reservation";

import {
    createReservation,
    deleteReservation,
    getReservations
} from "../../api/reservationApi";

import { getUsers } from "../../api/userApi";
import { getPublicSpaces } from "../../api/publicSpaceApi";

const Reservations = () => {

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [spaces, setSpaces] = useState<PublicSpace[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [userId, setUserId] = useState("");
    const [publicSpaceId, setPublicSpaceId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {

            const [
                reservationsData,
                usersData,
                spacesData
            ] = await Promise.all([
                getReservations(),
                getUsers(),
                getPublicSpaces()
            ]);

            setReservations(reservationsData);
            setUsers(usersData);
            setSpaces(spacesData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setUserId("");
        setPublicSpaceId("");
        setStartDate("");
        setEndDate("");
        setNotes("");
    };

    const createReservationHandler = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (saving) return;

        if (!userId) return;
        if (!publicSpaceId) return;
        if (!startDate) return;
        if (!endDate) return;

        try {

            setSaving(true);

            await createReservation({
                userId,
                publicSpaceId,
                startDate,
                endDate,
                notes
            });

            resetForm();

            await loadData();

        } catch (error: any) {

            const message =
                error.response?.data ??
                "Erro ao criar reserva.";

            alert(message);

        } finally {
            setSaving(false);
        }
    };

    const deleteReservationHandler = async (
        id: string
    ) => {

        const confirmed = window.confirm(
            "Deseja realmente excluir esta reserva?"
        );

        if (!confirmed)
            return;

        try {

            await deleteReservation(id);

            await loadData();

        } catch (error: any) {

            const message =
                error.response?.data ??
                "Erro ao excluir reserva.";

            alert(message);
        }
    };

    return (
        <div>

            <div className="container">

                <h1>Nova Reserva</h1>

                <form
                    onSubmit={createReservationHandler}
                    className="standard-form"
                >

                    <div className="standard-inputs">

                        <select
                            className="standard-input"
                            value={publicSpaceId}
                            onChange={(e) =>
                                setPublicSpaceId(e.target.value)
                            }
                        >
                            <option value="">
                                Selecione um espaço
                            </option>

                            {spaces.map(space => (
                                <option
                                    key={space.id}
                                    value={space.id}
                                >
                                    {space.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className="standard-input"
                            value={userId}
                            onChange={(e) =>
                                setUserId(e.target.value)
                            }
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

                        <input
                            type="datetime-local"
                            className="standard-input"
                            value={startDate}
                            onChange={(e) =>
                                setStartDate(e.target.value)
                            }
                        />

                        <input
                            type="datetime-local"
                            className="standard-input"
                            value={endDate}
                            onChange={(e) =>
                                setEndDate(e.target.value)
                            }
                        />

                        <textarea
                            className="standard-input"
                            placeholder="Observações"
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="standard-button"
                    >
                        Reservar
                    </button>

                </form>

            </div>

            <div className="container">

                <h1>Reservas</h1>

                {loading ? (
                    <p>Carregando reservas...</p>
                ) : (
                    <table className="standard-table">

                        <thead>
                            <tr>
                                <th>Espaço</th>
                                <th>Usuário</th>
                                <th>Início</th>
                                <th>Fim</th>
                                <th>Observações</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>

                            {reservations.map(reservation => (

                                <tr key={reservation.id}>

                                    <td>
                                        {reservation.publicSpaceName}
                                    </td>

                                    <td>
                                        {reservation.userName}
                                    </td>

                                    <td>
                                        {new Date(
                                            reservation.startDate
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {new Date(
                                            reservation.endDate
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {reservation.notes}
                                    </td>

                                    <td>
                                        <button
                                            className="standard-button"
                                            onClick={() =>
                                                deleteReservationHandler(
                                                    reservation.id
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
                )}

            </div>

        </div>
    );
};

export default Reservations;
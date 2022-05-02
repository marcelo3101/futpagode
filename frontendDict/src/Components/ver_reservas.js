import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../api";
import EditBooking from "./editar_reserva";

const SeeBookings = () => {
    const [reservas, setReservas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reserva, setReserva] = useState(null);

    const getReservas = () => {
        api.get(
            `/reservas/criou/${localStorage.getItem("cpf")}`
        ).then((res) => {
            setReservas(res.data);
            setLoading(false);
        });
    }
    
    useEffect(() => {
        getReservas();
    }, []);

    const handleDelete = (id) => {
        api.delete(
            `/reservas/${id}`,
        ).then( () => {
            setLoading(true);
            getReservas();
        }
        )
    }

    const handleEditClick = async (reserva) => {
        setReserva(reserva)
    }

    return(
        <div class="bg-white font-family-karla h-screen flex justify-center">   
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            {reserva &&
                <EditBooking reserva={reserva}/>
            }
            {!reserva &&
            <div class="flex flex-col">
                {!loading &&
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                        <thead class="border-b">
                            <tr>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Campo
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Início
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Fim
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            { reservas && reservas.map((reserva) => {
                                return (
                                    <tr class="border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {reserva.id}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {reserva.campo}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {reserva.data_hora_inicio}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {reserva.data_hora_termino}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => handleDelete(reserva.id)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2">
                                            Cancelar
                                        </button>
                                        <button onClick={() => handleEditClick(reserva)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2">
                                            Editar
                                        </button>
                                    </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                }
                </div>
                }
            </div>
        </div>
    )
}

export default SeeBookings;
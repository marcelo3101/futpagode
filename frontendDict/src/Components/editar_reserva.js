import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../api";

const EditBooking = ({reserva}) => {
    const [inicio, setInicio] = useState(reserva.data_hora_inicio);
    const [fim, setFim] = useState(reserva.data_hora_termino);
    const [loading, setLoading] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.patch(
            `/reservas/${reserva.id}`,
            {
                "data_hora_inicio": inicio,
                "data_hora_termino": fim,
            }
        ).then( () => {
            alert("reserva editada")
            setInicio("");
            setFim("");
        }
        )
    }

    useEffect(() => {
        if(reserva){
            setLoading(false);
        }
    }, [reserva]);
    
    return(
        <div class="bg-white font-family-karla h-screen flex justify-center">
            {!loading &&
           <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                 <p class="text-center text-3xl">Editar Reserva</p>
                 <form class="flex flex-col pt-3 md:pt-8" onSubmit={e => handleSubmit(e)}>
                     <div class="flex justify-center">
                      </div>
                        <div class="flex flex-col pt-4">
                         <label for="start-time" class="text-lg">Início</label>
                         <input value={inicio} onChange={e => setInicio(e.target.value)} type="datetime-local" id="start-time" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="flex flex-col pt-4">
                         <label for="start-time" class="text-lg">Término</label>
                         <input value={fim} onChange={e => setFim(e.target.value)} type="datetime-local" id="start-time" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                       <input type="submit" value="Salvar" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                 </form>
             </div>
             }
        </div>
    )
}

export default EditBooking;
import React, { useEffect, useState } from "react";
import api from "../api";

const CreateGame = () => {
    const [selected, setSelected] = useState(0);
    const [reservas, setReservas] = useState([]);
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post(
            "/jogos/",
            {
                "data_hora_inicio": inicio,
                "data_hora_termino": fim,
                "Ranking_maximo": 0,
                "Ranking_minimo": 0,
                "Reserva_id": parseInt(selected)
            }
        ).then( () => {
            alert("jogo criado")
            setSelected(0);
            setInicio("");
            setFim("");
        }
        )
    }

    useEffect(()=>{
        api.get(`/reservas/criou/${localStorage.getItem("cpf")}`)
        .then((res) => {
            setReservas(res.data)
        })
    }, [])

    return(
        <div class="bg-white font-family-karla h-screen flex justify-center">
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                 <p class="text-center text-3xl">Criar Jogo</p>
                 <form class="flex flex-col pt-3 md:pt-8" onSubmit={e => handleSubmit(e)}>
                     <div class="flex justify-center">
                        <div class="mt-3 mb-3 xl:w-96">
                            <select onChange={e => setSelected(e.target.value)} class="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                <option selected>Selecione uma Reserva</option>
                                {reservas.map((reserva) => {
                                    return (
                                        <option key={reserva.id} value={reserva.id}>{reserva.id}</option>
                                    );
                                })}
                            </select>
                        </div>
                      </div>
                        <div class="flex flex-col pt-4">
                         <label for="start-time" class="text-lg">Início</label>
                         <input value={inicio} onChange={e => setInicio(e.target.value)} type="datetime-local" id="start-time" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="flex flex-col pt-4">
                         <label for="start-time" class="text-lg">Término</label>
                         <input value={fim} onChange={e => setFim(e.target.value)} type="datetime-local" id="start-time" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                       <input type="submit" value="Reservar" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                 </form>
            </div>
        </div>
    )
}

export default CreateGame;
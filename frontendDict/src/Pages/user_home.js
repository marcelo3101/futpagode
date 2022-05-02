import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateGame from "../Components/criar_jogo";
import EditUser from "../Components/editar_perfil";
import MakeBooking from "../Components/fazer_reserva";
import SeeInscritos from "../Components/ver_inscritos";
import SeeGames from "../Components/ver_jogos";
import SeeCreated from "../Components/ver_jogos_criados";
import SeeBookings from "../Components/ver_reservas";
import SeeGamesWithCreator from "../Components/ver_jogos_criador";

const UserPage = () => {
    const [comp, setComp] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate  = useNavigate()
    const handleClickNavigate = (value) => {
        setLoading(true);
        setComp(value);
        setLoading(false);
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return(
        <body class="bg-white font-family-karla h-screen">

            <div class="w-full flex flex-wrap">
                <div class="w-full md:w-1/2 flex flex-col">

                    <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>
                    </div>

                    <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <h1 class="text-center text-3xl">Futpagode</h1>
                        <span>Olá {localStorage.getItem("nome")}</span>
                            <button onClick={() => handleClickNavigate(1)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Ver Reservas
                            </button>
                            <button onClick={() => handleClickNavigate(2)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Fazer Reserva
                            </button>
                            <button onClick={() => handleClickNavigate(3)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Ver Jogos + se inscrever em jogo (Procedure)
                            </button>
                            <button onClick={() => handleClickNavigate(8)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Ver Jogos + dados do criador (View)
                            </button>
                            <button onClick={() => handleClickNavigate(4)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Ver Jogos Inscritos
                            </button>
                            <button onClick={() => handleClickNavigate(5)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Ver jogos criados
                            </button>
                            <button onClick={() => handleClickNavigate(6)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Criar Jogo
                            </button>
                            <button onClick={() => handleClickNavigate(7)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Editar Perfil
                            </button>
                            <button onClick={() => handleLogout()} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                Sair
                            </button>
                    </div>

                </div>
                { !loading &&
                <div class="w-1/2 shadow-2xl">
                    {comp == 0 &&
                        <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0"/>
                    }
                    {comp == 1 &&
                        <SeeBookings/>
                    }
                    {comp == 2 &&
                        <MakeBooking/>
                    }
                    {comp == 3 &&
                        <SeeGames/>
                    }
                    {comp == 4 &&
                        <SeeInscritos/>
                    }
                    {comp == 5 &&
                        <SeeCreated/>
                    }
                    {comp == 6 &&
                        <CreateGame/>
                    }
                    {comp == 7 &&
                        <EditUser/>
                    }                   
                    {comp == 8 &&
                        <SeeGamesWithCreator />
                    }
                </div>
                }
            </div>

        </body>

    )
}

export default UserPage;
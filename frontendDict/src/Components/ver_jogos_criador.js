import React, { useEffect, useState } from "react";
import api from "../api";

const SeeGamesWithCreator = () => {
    const [jogos, setJogos] = useState(null);
    const getJogos = () => {
        api.get(
            `/jogos/withcreator`
        ).then((res) => {
            setJogos(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        getJogos();
    }, []);

    return(
        <div class="bg-white font-family-karla h-screen flex justify-center">
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <div class="flex flex-col">
            {
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
                                Data inicio
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Data fim
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nome criador
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                CPF criador
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {jogos && jogos.map((jogo) => {
                                return (
                                    <tr key={jogo.id} class="border-b">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {jogo["id jogo"]}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {jogo.data_hora_inicio}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {jogo.data_hora_termino}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {jogo.nome_criador}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {jogo.CPF_criador}
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
            </div>
        </div>
    )
}

export default SeeGamesWithCreator;
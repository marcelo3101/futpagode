import React, { useEffect, useState } from "react";
import api from "../api";

const SeeGames = () => {
    const [jogos, setJogos] = useState(null);
    const getJogos = () => {
        api.get(
            `/jogos`
        ).then((res) => {
            const userCPF = localStorage.getItem("cpf")
            const nJogos = res.data.map((jogo) => {
                let participa = false
                for(const j of jogo.participacao_em_jogo){
                    if(j.Jogador_CPF === userCPF)
                        participa = true
                }
                return {
                    ...jogo, 
                    participa: participa 
                }
            })
            setJogos(nJogos);
        }).catch((err) => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        getJogos();
    }, []);

    function handleSubscribe(jogoId){
        const data = {
            Jogador_CPF: localStorage.getItem("cpf"),
            Jogo_id: jogoId
        }

        api.post(
            "/jogos/enter",
            data   
        ).then(() => {
            setJogos(jogos.map((jogo)=>{
                if(jogoId === jogo.id){
                    let nJogo = jogo
                    jogo.participa = true   
                    return nJogo
                } else return jogo
            }))
        }).catch((err) => alert("Falha em se inscrever"))
    }

    function handleQuit(jogoId){
        const data = {
            Jogador_CPF: localStorage.getItem("cpf"),
            Jogo_id: jogoId
        }

        api.delete(
            "/jogos/quit/"+localStorage.getItem("cpf")+"/"+jogoId,
            data
        ).then(() => {
            setJogos(jogos.map((jogo)=>{
                if(jogoId === jogo.id){
                    let nJogo = jogo
                    jogo.participa = false   
                    return nJogo
                } else return jogo
            }))
        }).catch((err) => alert("Falha em se desinscrever"))
    }

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
                            {jogos && jogos.map((jogo) => {
                                return (
                                    <tr key={jogo.id} class="border-b">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {jogo.id}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {jogo.campo}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {jogo.data_hora_inicio}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {jogo.data_hora_termino}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            { jogo.participa?
                                                <button onClick={() => handleQuit(jogo.id)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2">
                                                    sair
                                                </button>
                                                :
                                                <button onClick={() => handleSubscribe(jogo.id)} class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2">
                                                    Inscrever-se
                                                </button>
                                            }
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

export default SeeGames;
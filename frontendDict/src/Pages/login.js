import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const LoginPage = () => {
    const [cpfInput, setCpfInput] = useState("");
    const inputOnChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value == '' || re.test(e.target.value)) setCpfInput(e.target.value);
    }
    
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Requisição para o back checando se o cpf está cadastrado, trocar os valores para o retorno da api
        api.post("/jogadores/login", 
            {
                "cpf": cpfInput
            }
        ).then((res) => {
            if(res.data.length === 0) throw new Error("conta inexistente")
            localStorage.setItem("cpf", cpfInput);
            localStorage.setItem("nome", res.data.nome);
            localStorage.setItem("datanasc", res.data.data_de_nascimento);
            setCpfInput("");
            navigate("/user_home");
        }).catch((err) => alert(err.message))
    }

    return(
        <body class="bg-white font-family-karla h-screen">

            <div class="w-full flex flex-wrap">
                <div class="w-full md:w-1/2 flex flex-col">

                    <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>
                    </div>

                    <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p class="text-center text-3xl">Bem-vindo.</p>
                        <form class="flex flex-col pt-3 md:pt-8" onSubmit={e => handleSubmit(e)}>
                            <div class="flex flex-col pt-4">
                                <label for="cpf" class="text-lg">CPF (Apenas números)</label>
                                <input value={cpfInput} onChange={e => inputOnChange(e)} type="cpf" id="cpf" placeholder="0000000000" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
            
                            <div class="flex flex-col pt-4">
                                <label for="password" class="text-lg">Senha</label>
                                <input type="password" id="password" placeholder="Senha" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
            
                            <input type="submit" value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
                        </form>
                        <div class="text-center pt-12 pb-12">
                            <p>Não possui uma conta? <a href="register.html" class="underline font-semibold">Registre-se.</a></p>
                        </div>
                    </div>

                </div>

                <div class="w-1/2 shadow-2xl">
                    <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0"/>
                </div>
            </div>

        </body>

    )
}

export default LoginPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const HomePage = () => {
    const [cpfInput, setCpfInput] = useState("");
    const inputOnChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value == '' || re.test(e.target.value)) setCpfInput(e.target.value);
    }

    const navigate = useNavigate()
    const handleClick = (path) => {
        navigate(`${path}`);
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
                        <button onClick={() => handleClick("/login")} value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Login</button>
                        <button onClick={() => handleClick("/register")} value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Cadastro</button>
                    </div>

                </div>

                <div class="w-1/2 shadow-2xl">
                    <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0"/>
                </div>
            </div>

        </body>

    )
}

export default HomePage;
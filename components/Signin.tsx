"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    async function handleSignin() {
        const res = await fetch("http://localhost:3000/api/user/signin", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
            return;
        }

        console.log(data);

        router.push("/");
    }

    return (
        <section className="mb-auto h-full flex justify-center mt-44">
            <div className="max-w-5xl gap-5 mx-auto flex flex-col items-center">
                <div>{error}</div>
                <h1 className="text-3xl font-bold">Login</h1>
                <div className="flex flex-col gap-2">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-xl px-5 focus:outline focus:border-2 focus:border-gray-400 py-2 rounded-md outline-none border"
                        placeholder="Email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-xl px-5 focus:outline focus:border-2 focus:border-gray-400 py-2 rounded-md outline-none border"
                        placeholder="Password"
                    />
                    <button
                        onClick={handleSignin}
                        className="border bg-gray-800 text-gray-100 px-5 py-2 rounded-md"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </section>
    );
}

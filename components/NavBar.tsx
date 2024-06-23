"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
    const session = useSession();

    const isAuthenticated = session.status === "authenticated";
    // console.log("authenticated = ", session);

    return (
        <nav className="py-2 border border-x-0 border-b border-t-0">
            <div className="flex items-center justify-between mx-auto max-w-5xl">
                <Link className="text-lg" href={"/"}>
                    Home
                </Link>
                {isAuthenticated ? (
                    <button
                        onClick={() => signOut()}
                        className="text-lg bg-gray-800 text-gray-100 px-3 py-1 rounded-md"
                    >
                        Logout
                    </button>
                ) : (
                    <div className="flex gap-10 items-center">
                        <button
                            onClick={() => signIn()}
                            className="text-lg bg-gray-800 text-gray-100 px-3 py-1 rounded-md"
                        >
                            Login
                        </button>
                        <Link
                            className="text-lg border px-3 py-1 rounded-md border-gray-800"
                            href={"/signup"}
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

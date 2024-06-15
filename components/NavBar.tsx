"use client";

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="py-2 border border-x-0 border-b border-t-0">
            <div className="flex items-center justify-between mx-auto max-w-5xl">
                <Link className="text-lg" href={"/"}>
                    Home
                </Link>
                <div className="flex gap-10 items-center">
                    <Link
                        className="text-lg bg-gray-800 text-gray-100 px-3 py-1 rounded-md"
                        href={"/signin"}
                    >
                        Login
                    </Link>
                    <Link
                        className="text-lg border px-3 py-1 rounded-md border-gray-800"
                        href={"/signup"}
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
}

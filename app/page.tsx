import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session?.user) {
        return redirect("/signin");
    }

    return (
        <main>
            <div className="text-4xl flex justify-center items-center font-bold">
                hi, {session?.user?.email}
            </div>
        </main>
    );
}

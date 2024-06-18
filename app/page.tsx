import { User } from "./models/user";

export default async function Home() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const user = await User.findOne({});

    return (
        <main>
            <div className="text-4xl flex justify-center items-center font-bold">
                hi, {user.email}
            </div>
        </main>
    );
}

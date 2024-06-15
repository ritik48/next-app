import { connectDb } from "@/app/lib/db";
import { User } from "@/app/models/user";
import { NextRequest } from "next/server";

interface UserType {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        await connectDb();
    } catch (error) {
        return Response.json({
            success: false,
            message: "Something went wrong",
        });
    }

    const body: UserType = await req.json();

    await User.create({ ...body });

    return Response.json({ success: true, message: "account created" });
}

// export function GET(req: NextRequest) {
//     Response.json({ success: true, message: "account created" });
// }

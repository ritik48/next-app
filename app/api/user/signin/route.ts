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
        console.log(error);
        return Response.json({
            success: false,
            message: "Something went wrong",
        });
    }

    console.log("here ologin");

    const body: UserType = await req.json();

    const user = await User.findOne({ ...body });
    if (!user) {
        return Response.json({
            success: false,
            message: "Invalid credentials",
        });
    }

    return Response.json({ success: true, message: "User logged in" });
}

// export function GET(req: NextRequest) {
//     Response.json({ success: true, message: "account created" });
// }

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

    const checkUSerEsixts = await User.findOne({ email: body.email });
    if (checkUSerEsixts) {
        console.log("yess");
        return Response.json(
            { success: false, message: "User with this email already exists" },
            { status: 401 }
        );
    }

    await User.create({ ...body });

    return Response.json({ success: true, message: "account created" });
}

// export function GET(req: NextRequest) {
//     Response.json({ success: true, message: "account created" });
// }

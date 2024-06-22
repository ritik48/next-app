import { User } from "../models/user";
import { connectDb } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        // @ts-ignore
        CredentialsProvider({
            name: "Credential Auth",
            async authorize(credentials: any): Promise<any> {
                const { email, password } = credentials;
                await connectDb();

                const user = await User.findOne({ email, password });
                if (!user) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        session({ token, session }: any) {
            if (session && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        async redirect({ baseUrl }: { baseUrl: string }) {
            return baseUrl;
        },
    },
    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

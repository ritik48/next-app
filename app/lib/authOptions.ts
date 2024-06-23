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
                    throw new Error("Invalid credentials");
                }
                
                // Adding random property r to understand how to make it available in the response
                return {
                    r: "hello",
                    id: user.id,
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }: any) {
            
            // we have to make check on user, because The arguments user, account, profile and isNewUser are only passed 
            // the first time this callback is called on a new session, after the user signs in.In subsequent calls, 
            // only token will be available.
            if (user && user.r) {
                token.r = user.r;
            }

            return token;
        },
        session({ token, session, user }: any) {
            if (session && session.user) {
                session.user.id = token.sub;
                session.user.r = token.r;
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

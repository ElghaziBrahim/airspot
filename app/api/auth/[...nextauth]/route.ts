import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../libs/prismadb"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials")
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials")
                }
                const { hashedPassword, ...userNoPassword } = user
                return userNoPassword
            }
        })
    ],
    /* callbacks : */
    /* callbacks: {
        async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
            if (!account) {
                // Handle the case where account is null
                return false; // Or other appropriate logic
            }
            if (account?.provider == "credentials") {
                return true;
            }
            if (account?.provider == "github") {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: {
                            email: user.email as string
                        }
                    })
                    if (!existingUser) {
                        const email = user.email
                        const newUser = await prisma.user.create({
                            data: {
                                email
                            }
                        })
                        return true;
                    }
                    return true;
                } catch (err) {
                    console.log("Error saving user", err);
                    return false;
                }
            }
        },
    }, */
    pages: {
        signIn: "/"
    },
    debug: process.env.NODE_ENV == 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,

}

const handler = NextAuth(authOptions)
/* export  default handler */
export { handler as GET, handler as POST }
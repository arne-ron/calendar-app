// Based on https://nextjs.org/learn/dashboard-app
import type { NextAuthConfig } from 'next-auth';
import postgres from "postgres";
import {User} from "@/app/definitions";


// TODO do a lil deepdive into this
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({session, token}) {
            session.user = {...session.user, id: token.id as string}
            return session
        },

        async jwt({token, account, profile}){
            const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

            if (account && profile) {
                token.accessToken = account.access_token
                const res = await sql<User[]>`SELECT * FROM "users" WHERE email=${profile.email!}`
                if (res.length == 0) {
                    await sql`
                        INSERT INTO "users" (name, email, source) /* id gets auto-generated */
                        VALUES (${profile.name!}, ${profile.email!}, ${account.provider})
                    `
                    const res = await sql<User[]>`SELECT * FROM "users" WHERE email=${profile.email!}`
                    token.id = res[0].id
                } else {
                    token.id = res[0].id;
                }
            }
            return token
        },

        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            // Defines which sites need to be authenticated TODO this will need some changing and research later
            const isOnCalendar = nextUrl.pathname.startsWith('/calendar');
            if (isOnCalendar) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/calendar', nextUrl));
            }
            return true;
        },

    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
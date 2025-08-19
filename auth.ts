import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import {compare} from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import postgres from "postgres";
import type {User} from "@/app/definitions";
import {storeRefreshToken} from "@/app/actions";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


/**
 * Returns the user associated with the given email
 *
 * @param email The unique email to fetch the user with
 */
async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}




export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);


                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await compare(password, user.password);

                    if (passwordsMatch) return user;
                }
                console.log('Invalid credentials.');
                return null;
            },
        }),
        GoogleProvider({
            id: "google-connection",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent", // TODO remove this once tried and tested
                    access_type: "offline",
                    response_type: "code",
                    scope:
                        "openid email profile https://www.googleapis.com/auth/calendar"
                },
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    response_type: "code",
                },
            },
        })
    ],
    callbacks: {
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
        async jwt({token, user, account, profile}){

            // TODO remove debug prints
            console.log("+jwt")
            console.log(`--token: ${JSON.stringify(token)}`)
            console.log(`--user: ${JSON.stringify(user)}`)
            console.log(`--account: ${JSON.stringify(account)}`)
            console.log(`--profile: ${JSON.stringify(profile)}`)

            if (account) {
                // Suffix "-connection" indicates that a permission is being added and not a signin is done
                if (account.provider.endsWith("connection")) {
                    token.accessToken = account.access_token
                    if (account.refresh_token) {
                        // await storeRefreshToken(account.refresh_token, token.id as string)
                    }

                // Otherwise it's a signin/signup with a provider
                } else {
                    // check if it's a new user
                    // TODO more specific SELECT
                    const res = await sql<User[]>`SELECT * FROM "users" WHERE email=${user.email!}`
                    if (res.length == 0) {
                        await sql`
                            INSERT INTO "users" (name, email, source) /* id gets auto-generated */
                            VALUES (${user.name!}, ${user.email!}, ${account.provider})
                        `
                        const res = await sql<User[]>`SELECT * FROM "users" WHERE email=${user.email!}`
                        token.id = res[0].id

                        // Known user
                    } else {
                        // Store the id in a persisting field
                        token.id = token.sub
                    }
                }
            }

            return token
        },
        async session({session, token}) {
            console.log("+session")
            console.log(`--token: ${JSON.stringify(token)}`)
            console.log(`--session pre: ${JSON.stringify(session)}`)
            // @ts-expect-error I dont use a AdapterUser
            session.user = {...session.user, id: token.id as string, google_access_token: token.google_access_token}
            console.log(`--session post: ${JSON.stringify(session)}`)
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    }
})
// This utilizes NextAuth to handle user authentication
// Based on https://nextjs.org/learn/dashboard-app

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/definitions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import bcrypt from 'bcrypt';
import postgres from 'postgres';


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


export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log('---authorize called')
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);


                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    // const passwordsMatch = await bcrypt.compare(password, user.password); // TODO implement hashing of passwords
                    const passwordsMatch = password === user.password;

                    if (passwordsMatch) return user;
                }
                console.log('Invalid credentials.');
                return null;
            },
        }),
    ],
});
// Based on https://nextjs.org/learn/dashboard-app
import type { NextAuthConfig } from 'next-auth';


// TODO do a lil deepdive into this
export const authConfig = {
    pages: {
        signIn: '/login',
    },
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

    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
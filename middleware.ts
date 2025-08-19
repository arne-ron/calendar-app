import NextAuth from "next-auth";
import {authConfig} from "@/app/auth.config";

export const config = {
    // TODO https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], original copied
    matcher: ['/calendar/:path*'],
};

export const { auth: middleware } = NextAuth(authConfig)
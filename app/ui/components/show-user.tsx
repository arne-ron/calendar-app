import {auth} from "@/app/auth";


export async function ShowUser() {
    const session = await auth()
    console.log(session)


    return `Currently logged in as: ${session?.user?.name}`;
}
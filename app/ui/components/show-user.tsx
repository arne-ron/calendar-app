import {auth} from "@/app/auth";


/**
 * A temporary component to display the currently selected user
 *
 * TODO temporary solution
 * @constructor
 */
export async function ShowUser() {
    const session = await auth()

    return `Currently logged in as: ${session?.user?.name}`;
}
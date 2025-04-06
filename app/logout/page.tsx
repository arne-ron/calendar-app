import {signOut} from "@/app/auth";

export default function Page() {
    return (
        <form action={async () => {
            "use server"
            console.log('signed out')
            await signOut()
        }}>
            <button>Sign out</button>
        </form>
    )
}
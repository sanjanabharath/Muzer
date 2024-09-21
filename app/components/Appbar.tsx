"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession();
    return <div>
    <div className="flex justify-between">
        <div>
            Muzer
        </div>
    
    <div>
        {session.data?.user && <button className="p-2 m-2 bg-blue-500" onClick={() => signOut()}>Logout</button>}
        {!session.data?.user && <button className="p-2 m-2 bg-blue-500" onClick={() => signIn()}>Sign In</button>}
    </div>
    </div>
    </div>
}
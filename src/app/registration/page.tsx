'use client'

import { useRouter } from "next/navigation";
import { Registration } from "../components/Registration"
import { CheckSessionLogin } from "../helper/sessionManager";


export default function Page () {

    CheckSessionLogin(useRouter());

    return (
        <div>
            <Registration/>
        </div>
    )
}
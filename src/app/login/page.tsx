'use client'

import { useRouter } from "next/navigation";
import { LoginForm } from "../components/LoginForm"
import { CheckSessionLogin } from "../helper/sessionManager";

export default function Page () {

    CheckSessionLogin(useRouter());

    return (
        <div>
            <LoginForm/>
        </div>
    )
}
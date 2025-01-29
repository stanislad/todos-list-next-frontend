import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useEffect } from "react"

export const CheckSessionLogin = (router: AppRouterInstance, signedIn = false) => {

    const checkSessionSignedIn = () => {
        if(!localStorage.getItem('userId')) router.push('login')
    }

    const checkSessionSignedOut = () => { 
        if(localStorage.getItem('userId')) router.push('/')
    }

    const sessionFunction = signedIn ? checkSessionSignedIn : checkSessionSignedOut;
    
    useEffect(() => {
        sessionFunction()
        const interval = setInterval(()=>{
            sessionFunction()
        }, 2000)

        return () => clearInterval(interval);
    },[])
}

export const signOut = (router: AppRouterInstance)=>{
    localStorage.clear()
    router.push('login')
}
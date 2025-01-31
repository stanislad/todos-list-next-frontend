import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useEffect } from "react"

export const CheckSessionLogin = (router: AppRouterInstance, signedIn = false) => {

    const userId = getUserId()

    const checkSessionSignedIn = () => {
        if(!userId) router.push('login')
    }

    const checkSessionSignedOut = () => { 
        if(userId) router.push('/')
    }

    const sessionFunction = signedIn ? checkSessionSignedIn : checkSessionSignedOut;
    
    useEffect(() => {
        if(getUserId()){
            sessionFunction()
            const interval = setInterval(()=>{
                sessionFunction()
            }, 2000)
    
            return () => clearInterval(interval);
        }
    },[])
}

export const signOut = (router: AppRouterInstance)=>{
    localStorage.clear()
    router.push('login')
}

export const getUserId = () => {
    if (typeof window !== 'undefined')
        return localStorage?.getItem("userId") ?? null;
    else 
        return null
}
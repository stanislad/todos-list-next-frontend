'use client'

import { List } from "@/app/components/list"
import { Todos } from "@/types/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FetchTodosQuery } from "./query/queries"
import { Button } from "./components/Button"

export default function Page () {
    const [results, setResults] = useState<Todos[] | undefined>([])
    const {data, isFetched} = FetchTodosQuery()
    const router = useRouter()

    const click = ()=>{
        router.push('create')
    }

    useEffect(() => {
        if(isFetched)
        setResults(data.message)
    },[data, isFetched])
    

    return (
        <div>
            <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Todo List Items:</h2>
                <Button buttonText="Create Todo" callback={click} position="float-right mt-6 md:mt-4"></Button>
            <List items={results as Todos[]}></List>
        </div>
    )
}


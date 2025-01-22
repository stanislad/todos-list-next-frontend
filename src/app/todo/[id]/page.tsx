'use client'

import { Form } from "@/app/components/Form"
import { DeleteMutation, UpdateMutation } from "@/app/query/mutations"
import { FetchTodoQuery } from "@/app/query/queries"
import { Todos } from "@/types/types"
import { use, useEffect } from "react"

export default function Page ({ params } : { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const {data, isLoading, refetch} = FetchTodoQuery(id)
    const {mutate : updateMutate} = UpdateMutation()
    const {mutate : deleteMutate} = DeleteMutation()

    useEffect(() => {
        if (id) {
          refetch();
        }
      }, [id, refetch]);

    const saveTodo = (name: string, description: string) => {
        updateMutate({id, name, description})
    }

    const deleteTodo = () => {
        deleteMutate({id})
    }

    if (isLoading || !data) return <div>Loading...</div>

    return (
        <div>
            <Form 
                todo={data as Todos}
                callback={saveTodo}
                editMode={true}
                callbackDelete={deleteTodo}
                createMode={true}
            />
        </div>
    )
}
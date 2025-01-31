'use client'

import { Form } from "@/app/components/Form"
import { DeleteMutation, UpdateMutation } from "@/app/query/mutations"
import { FetchTodoQuery } from "@/app/query/queries"
import { Todos } from "@/types/types"
import { use, useEffect } from "react"
import { CheckSessionLogin } from "../helper/sessionManager"
import { useRouter } from "next/navigation"
import { useSpinnerStore } from "../components/LoadingSpinner"

export default function Page ({ params } : { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const {data, isLoading, refetch} = FetchTodoQuery(id)
    const {mutate : updateMutate} = UpdateMutation()
    const {mutate : deleteMutate} = DeleteMutation()
    const setSpinner = useSpinnerStore((state) => state.setSpinner);

    CheckSessionLogin(useRouter(), true);

    useEffect(() => {
        if (id) {
          refetch();
        }
      }, [id, refetch]);

    const saveTodo = (name: string, description: string, dateTimeDb: string) => {
        updateMutate({id, name, description, dateTimeDb})
    }

    const deleteTodo = () => {
        deleteMutate({id})
    }

    if (isLoading || !data) {
        setSpinner(true)
        return;
    }

    setSpinner(false)

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
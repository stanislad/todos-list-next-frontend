'use client'

import { Form } from "@/app/components/Form"
import { CreateMutation } from "@/app/query/mutations"
import { Todos } from "@/types/types"

export default function Page () {
    const {mutate} = CreateMutation()


    const saveTodo = (name: string) => {
        mutate({name})
    }

    const emptyTodo : Todos = {
        id: "",
        todo: "",
        imageUrl: "",
        createdAt: "",
        completed: false,
    }

    return (
        <div>
            <Form 
            todo={emptyTodo}
            callback={saveTodo}
            editMode={false}
            />
        </div>
    )
}
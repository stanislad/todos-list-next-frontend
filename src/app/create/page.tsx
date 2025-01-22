'use client'

import { Form } from "@/app/components/Form"
import { CreateMutation } from "@/app/query/mutations"
import { Todos } from "@/types/types"

export default function Page () {
    const {mutate: createMutation} = CreateMutation()


    const saveTodo = (name: string, description: string) => {
        createMutation({name, description})
    }

    const emptyTodo : Todos = {
        id: "",
        todo: "",
        description: "",
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
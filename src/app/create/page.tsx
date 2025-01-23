'use client'

import { Form } from "@/app/components/Form"
import { CreateMutation } from "@/app/query/mutations"
import { emptyTodo } from "@/types/types"

export default function Page () {
    const {mutate: createMutation} = CreateMutation()


    const saveTodo = (name: string, description: string, dateTime: string) => {
        createMutation({name, description, dateTime})
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
'use client'

import { Form } from "@/app/components/Form"
import { CreateMutation } from "@/app/query/mutations"
import { emptyTodo } from "@/types/types"

export default function Page () {
    const {mutate: createMutation} = CreateMutation()


    const saveTodo = (name: string, description: string, dateTimeDb: string) => {
        createMutation({name, description, dateTimeDb})
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
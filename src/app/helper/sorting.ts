import { Todos } from "@/types/types"

export const sortByDate = (items : Todos[]) => {
    const dateInvalid = items.filter(todo => !todo.dateTimeDb)
    const dateValid = items.filter(todo => todo.dateTimeDb)
    const sortedList = dateValid.sort((a, b) => (new Date(a?.dateTimeDb) as any) - (new Date(b?.dateTimeDb) as any))
    return sortedList.concat(dateInvalid);
}
export interface Todos {
    id: string,
    todo: string,
    createdAt : string,
    completed : boolean,
    description : string,
    dateTimeDb: string,
    imageUrl : string
}

export const emptyTodo : Todos = {
    id: "",
    todo: "",
    description: "",
    imageUrl: "",
    createdAt: "",
    dateTimeDb: "",
    completed: false,
}
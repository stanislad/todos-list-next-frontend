'use client'

import { useQuery } from '@tanstack/react-query'

export const API_URL = 'https://hfyi00ou55.execute-api.eu-west-1.amazonaws.com/dev/'

export const FetchTodosQuery = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })
}
const fetchTodos = () => fetch(API_URL, {
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json'
    }
}).then(data=>data.json())


export const FetchTodoQuery = (id: string) => {
    return useQuery({
        queryKey: ['todo', id], // Include `id` in the queryKey to make it unique
        queryFn: ()=>fetchTodo(id),
        enabled: !!id, // Only fetch if `id` is defined
    })
}
export const fetchTodo = (id : string) => fetch(API_URL+id, {
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json'
    }
}).then(data=>data.json())
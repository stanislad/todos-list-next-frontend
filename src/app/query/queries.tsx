'use client'

import { Login } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { getUserId } from '../helper/sessionManager'

export const API_URL = 'https://hfyi00ou55.execute-api.eu-west-1.amazonaws.com/dev/'

// FETCH ALL ITEMS

export const FetchTodosQuery = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })
}
const fetchTodos = () => fetch(API_URL+'todos/'+getUserId(), {
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json'
    }
}).then(data=>data.json())


// FETCH ITEM

export const FetchTodoQuery = (id: string) => {
    return useQuery({
        queryKey: ['todo', id], // Include `id` in the queryKey to make it unique
        queryFn: ()=>fetchTodo(id),
        enabled: !!id, // Only fetch if `id` is defined
    })
}
export const fetchTodo = (id : string) => fetch(API_URL+'todo/'+id, {
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json'
    }
}).then(data=>data.json())
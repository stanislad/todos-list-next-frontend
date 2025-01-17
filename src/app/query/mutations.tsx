'use client'

import {
    useMutation,
    useQueryClient,
    } from '@tanstack/react-query';
import { API_URL } from './queries';
import { useRouter } from 'next/navigation';

//UPDATE

  export const UpdateMutation = () =>{
    const router = useRouter()
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id, name} : {id : string, name: string})=>updateTodo(id, name),
      onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ['todos']})
        queryClient.invalidateQueries({queryKey: ['todo']})
        router.push('/todo/')
      }
    })
  }

export const updateTodo = (id : string, name: string) => fetch(API_URL+'update/'+id, {
    mode: 'cors',
    body: JSON.stringify({todo: name}),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post'
}).then(data=>data.json())

//CREATE

export const CreateMutation = () =>{
    const router = useRouter()
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({name} : {name: string})=>createTodo(name),
      onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ['todos']})
        router.push('/todo/')
      }
    })
  }

const createTodo = (name: string) => fetch(API_URL+'create/', {
    mode: 'cors',
    body: JSON.stringify({todo: name}),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post'
}).then(data=>data.json())

//DELETE

export const DeleteMutation = () =>{
  const router = useRouter()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id} : {id: string})=>deleteTodo(id),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['todos']})
      router.push('/todo/')
    }
  })
}

const deleteTodo = (id: string) => fetch(API_URL+'delete/'+id, {
  mode: 'cors',
  headers: {
      'Content-Type': 'application/json'
  },
  method: 'delete'
}).then(data=>data.json())


//COMPLETE

export const CompleteMutation = () =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, completed} : {id: string, completed: boolean})=>completeTodo(id, completed),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['todos']})
    }
  })
}

const completeTodo = (id: string, completed: boolean) => fetch(API_URL+'complete/'+id, {
  mode: 'cors',
  body: JSON.stringify({completed}),
  headers: {
      'Content-Type': 'application/json'
  },
  method: 'put'
}).then(data=>data.json())

//IMAGE UPLOAD

export const ImageUploadMutation = () =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id,mime,image} : {id: string, mime : string,image: string})=>imageUpload(id,mime,image),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['todo']})
    }
  })
}

const imageUpload = (id: string,mime : string,image: string) => fetch(API_URL+'upload/'+id, {
  mode: 'cors',
  body: JSON.stringify({mime,image}),
  headers: {
      'Content-Type': 'application/json'
  },
  method: 'put'
}).then(data=>data.json())
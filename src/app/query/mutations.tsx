'use client'

import {
    useMutation,
    useQueryClient,
    } from '@tanstack/react-query';
import { API_URL } from './queries';
import { useRouter } from 'next/navigation';
import { Login } from '@/types/types';

//REGISTER

export const RegisterMutation = () => {
  const router = useRouter()

  return useMutation({
      mutationFn: ({email, password} : Login)=>registerQuery({email, password}),
      onSuccess: (res : {info: string})=>{
        if(res && res.info){
          if(res.info === 'email already used'){
            alert('email already used')
          } 
          else router.push('login');
        } else alert('Login Error');
      }
  })
}
const registerQuery = ({email, password} : Login) => fetch(API_URL+'register/', {
  mode: 'cors',
  method: 'post',
  body: JSON.stringify({email, password}),
  headers: {
  'Content-Type': 'application/json'
  }
}).then(data=>data.json())

//LOGIN

export const LoginMutation = () => {
  const router = useRouter()

  return useMutation({
      mutationFn: ({email, password} : Login)=>loginQuery({email, password}),
      onSuccess: (res : {info: string, userId: string})=>{

        if(res && res.info && res.userId){
          if(res.info === 'user authorised'){
            localStorage.setItem('userId', res.userId)
            router.push('/')
          } 
          else alert('Wrong Email/Password combination');
        } else alert('Login Error')
      }
  })
}
const loginQuery = ({email, password} : Login) => fetch(API_URL+'login/', {
  mode: 'cors',
  method: 'post',
  body: JSON.stringify({email, password}),
  headers: {
  'Content-Type': 'application/json'
  }
}).then(data=>data.json())

//UPDATE

  export const UpdateMutation = () =>{
    const router = useRouter()
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id, name, description, dateTimeDb} : {id : string, name: string, description: string, dateTimeDb: string})=>updateTodo(id, name, description, dateTimeDb),
      onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ['todos']})
        queryClient.invalidateQueries({queryKey: ['todo']})
        router.push('/')
      }
    })
  }

export const updateTodo = (id : string, name: string, description: string, dateTimeDb: string) => fetch(API_URL+'update/'+id, {
    mode: 'cors',
    body: JSON.stringify({todo: name, description, dateTimeDb}),
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
      mutationFn: ({name, description, dateTimeDb} : {name: string, description: string, dateTimeDb: string})=>createTodo(name, description, dateTimeDb),
      onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ['todos']})
        router.push('/')
      }
    })
  }

const createTodo = (name: string, description: string, dateTimeDb: string) => fetch(API_URL+'create/', {
    mode: 'cors',
    body: JSON.stringify({todo: name, description, dateTimeDb}),
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
      router.push('/')
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
import { ToDo } from "../types/ToDo";
import apiCLient from "./client";

export const getToDos = async (): Promise<ToDo[]> => {
    return apiCLient<ToDo[]>('/todos');
}

export const createToDo = async (todo: ToDo): Promise<ToDo> => {
    return apiCLient<ToDo>('/todos', {
        method: 'POST',
        body: JSON.stringify(todo)
    });
}

export const markDone = async (id: number): Promise<void> =>{
    return apiCLient<void>(`/todos/${id}/done`,{
        method: 'POST'
    })
}

export const markUnDone = async (id: number): Promise<void> =>{
    return apiCLient<void>(`/todos/${id}/undone`,{
        method: 'PUT'
    })
}

export const deleteTodo = async (id: number): Promise<ToDo> =>{
    return apiCLient<ToDo>(`/todos/${id}`,{
        method: 'DELETE'
    })
}
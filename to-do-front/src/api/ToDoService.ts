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

export const markDone = async (id: number): Promise<string> =>{
    return apiCLient<string>(`/todos/${id}/done`,{
        method: 'POST'
    })
}

export const markUnDone = async (id: number): Promise<string> =>{
    return apiCLient<string>(`/todos/${id}/undone`,{
        method: 'PUT'
    })
}
import { Page } from "../types/Page";
import { ToDo } from "../types/ToDo";
import apiCLient from "./client";

export const getToDos = async (page: number): Promise<Page> => {
    return apiCLient<Page>(`/todos?page=${page}`);
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
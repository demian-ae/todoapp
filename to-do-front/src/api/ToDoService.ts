import { Page } from "../types/Page";
import { ToDo } from "../types/ToDo";
import apiCLient from "./client";

export const getToDos = async (page: number, done?:boolean, priority?:number, text?:string, isPriorityAsc?:boolean, isDueDateAsc?:boolean): Promise<Page> => {
    console.log(text)
    let url = `/todos?page=${page}`;
    if(done!==undefined) url = url + `&done=${done}`;
    if(priority!==undefined) url = url + `&priority=${priority}`;
    if(text!==undefined) url = url + `&text=${text}`;
    if(isPriorityAsc!==undefined) url = url + `&isPriorityAsc=${isPriorityAsc}`;
    if(isDueDateAsc!==undefined) url = url + `&isDueDateAsc=${isDueDateAsc}`;
    
    console.log(url);
    return apiCLient<Page>(url);
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
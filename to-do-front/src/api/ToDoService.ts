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
import { ToDo } from "../types/ToDo";
import apiCLient from "./client";

export const getToDos = async (): Promise<ToDo[]> => {
    return apiCLient<ToDo[]>('/todos');
}

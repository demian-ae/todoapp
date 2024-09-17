import { ToDo } from "./ToDo";

export interface Page {
    curr: number,
    total: number,
    data: ToDo[]
}
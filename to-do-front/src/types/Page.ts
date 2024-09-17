import { ToDo } from "./ToDo";

export interface Page {
    curr: number,
    total: number,
    allAvgTime: string,
    lowAvgTime: string,
    mediumAvgTime: string,
    highAvgTime: string,
    data: ToDo[]
}
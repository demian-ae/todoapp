import { Page } from "../types/Page";
import { ToDo } from "../types/ToDo";
import apiCLient from "./client";

/**
 * Fetches a paginated list of to-dos with optional filters.
 * @param {number} page - The page number to fetch.
 * @param {boolean} [done] - Filter by completion status.
 * @param {number} [priority] - Filter by priority level.
 * @param {string} [text] - Filter by text search.
 * @param {boolean} [isPriorityAsc] - Sort by priority in ascending order.
 * @param {boolean} [isDueDateAsc] - Sort by due date in ascending order.
 * @returns {Promise<Page>} - A promise that resolves to a page of to-dos.
 */
export const getToDos = async (
    page: number, 
    done?: boolean, 
    priority?: number, 
    text?: string, 
    isPriorityAsc?: boolean, 
    isDueDateAsc?: boolean
): Promise<Page> => {
    console.log(text);
    let url = `/todos?page=${page}`;
    if (done !== undefined) url = url + `&done=${done}`;
    if (priority !== undefined) url = url + `&priority=${priority}`;
    if (text !== undefined) url = url + `&text=${text}`;
    if (isPriorityAsc !== undefined) url = url + `&isPriorityAsc=${isPriorityAsc}`;
    if (isDueDateAsc !== undefined) url = url + `&isDueDateAsc=${isDueDateAsc}`;
    
    console.log(url);
    return apiCLient<Page>(url);
}

/**
 * Creates a new to-do item.
 * @param {ToDo} todo - The to-do item to create.
 * @returns {Promise<ToDo>} - A promise that resolves to the created to-do item.
 */
export const createToDo = async (todo: ToDo): Promise<ToDo> => {
    return apiCLient<ToDo>('/todos', {
        method: 'POST',
        body: JSON.stringify(todo)
    });
}

/**
 * Marks a to-do item as done.
 * @param {number} id - The ID of the to-do item to mark as done.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const markDone = async (id: number): Promise<void> => {
    return apiCLient<void>(`/todos/${id}/done`, {
        method: 'POST'
    });
}

/**
 * Marks a to-do item as undone.
 * @param {number} id - The ID of the to-do item to mark as undone.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const markUnDone = async (id: number): Promise<void> => {
    return apiCLient<void>(`/todos/${id}/undone`, {
        method: 'PUT'
    });
}

/**
 * Deletes a to-do item.
 * @param {number} id - The ID of the to-do item to delete.
 * @returns {Promise<ToDo>} - A promise that resolves to the deleted to-do item.
 */
export const deleteTodo = async (id: number): Promise<ToDo> => {
    return apiCLient<ToDo>(`/todos/${id}`, {
        method: 'DELETE'
    });
}

/**
 * Edits an existing to-do item.
 * @param {ToDo} todo - The to-do item to edit.
 * @returns {Promise<ToDo>} - A promise that resolves to the edited to-do item.
 */
export const editTodo = async (todo: ToDo): Promise<ToDo> => {
    return apiCLient<ToDo>(`/todos/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo)
    });
}
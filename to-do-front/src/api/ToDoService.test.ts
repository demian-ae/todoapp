/**
 * This file contains unit tests for the ToDoService module.
 * 
 * @module ToDoServiceTest
 */
// This code is mocking the './client' module using Jest's mocking functionality.
// It replaces the actual implementation of './client' with a mock function.
jest.mock('./client', () => jest.fn());

// This line imports the mocked version of './client' and assigns it to the 'apiClient' variable.
import apiClient from './client';
import { ToDo } from '../types/ToDo';
import { getToDos, createToDo, markDone, markUnDone, deleteTodo, editTodo } from './ToDoService';

const mockApiClient = apiClient as jest.Mock;

test('should construct the correct URL for getToDos', async () => {
    // Mocking the API client to return an empty response
    mockApiClient.mockResolvedValue({ content: [], totalElements: 0, totalPages: 0 });

    await getToDos(1, true, 2, 'test', true, false);

    expect(mockApiClient).toHaveBeenCalledWith(
        '/todos?page=1&done=true&priority=2&text=test&isPriorityAsc=true&isDueDateAsc=false'
    );
});

test('should handle errors from apiClient for getToDos', async () => {
    mockApiClient.mockRejectedValue(new Error('API Error'));

    await expect(getToDos(1)).rejects.toThrow('API Error');
});


test('should send a POST request with the correct body for createToDo', async () => {
    const mockTodo: ToDo = {
        id: null,
        text: 'Test ToDo',
        done: false,
        priority: 1,
        doneDate: '',
        dueDate: '2024-12-31',
        creationDate: '2024-12-25',
    };
    const createdTodo: ToDo = {
        ...mockTodo,
        id: 1, // Simulate that the server assigns an ID
    };
    mockApiClient.mockResolvedValue(createdTodo);

    const result = await createToDo(mockTodo);

    expect(mockApiClient).toHaveBeenCalledWith('/todos', {
        method: 'POST',
        body: JSON.stringify(mockTodo),
    });
    expect(result).toEqual(createdTodo);
});

test('should send a PUT request with the correct body to edit a ToDo', async () => {
    const mockTodo: ToDo = {
        id: 1,
        text: 'Updated ToDo',
        done: true,
        priority: 2,
        doneDate: '2024-12-26',
        dueDate: '2024-12-31',
        creationDate: '2024-12-25',
    };
    mockApiClient.mockResolvedValue(mockTodo);

    const result = await editTodo(mockTodo);

    expect(mockApiClient).toHaveBeenCalledWith(`/todos/1`, {
        method: 'PUT',
        body: JSON.stringify(mockTodo),
    });
    expect(result).toEqual(mockTodo);
});

test('should send a DELETE request to delete a ToDo', async () => {
    const mockTodo: ToDo = {
        id: 1,
        text: 'ToDo to be deleted',
        done: false,
        priority: 3,
        doneDate: '',
        dueDate: '2024-12-31',
        creationDate: '2024-12-25',
    };
    mockApiClient.mockResolvedValue(mockTodo);

    const result = await deleteTodo(1);

    expect(mockApiClient).toHaveBeenCalledWith('/todos/1', { method: 'DELETE' });
    expect(result).toEqual(mockTodo);
});


test('should send a POST request to mark a ToDo as done', async () => {
    mockApiClient.mockResolvedValue(undefined);

    await markDone(1);

    expect(mockApiClient).toHaveBeenCalledWith('/todos/1/done', { method: 'POST' });
});


test('should send a PUT request to mark a ToDo as undone', async () => {
    mockApiClient.mockResolvedValue(undefined);

    await markUnDone(1);

    expect(mockApiClient).toHaveBeenCalledWith('/todos/1/undone', { method: 'PUT' });
});

test('should construct the correct URL for getToDos', async () => {
    const mockPage = {
        content: [],
        totalElements: 0,
        totalPages: 0,
    };
    mockApiClient.mockResolvedValue(mockPage);

    await getToDos(1, false, 2, 'test', true, false);

    expect(mockApiClient).toHaveBeenCalledWith(
        '/todos?page=1&done=false&priority=2&text=test&isPriorityAsc=true&isDueDateAsc=false'
    );
});

test('should handle errors from apiClient for createToDo', async () => {
    const mockTodo: ToDo = {
        id: null,
        text: 'Test ToDo',
        done: false,
        priority: 1,
        doneDate: '',
        dueDate: '2024-12-31',
        creationDate: '2024-12-25',
    };
    mockApiClient.mockRejectedValue(new Error('API Error'));

    await expect(createToDo(mockTodo)).rejects.toThrow('API Error');
});
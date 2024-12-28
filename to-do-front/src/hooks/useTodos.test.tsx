import { renderHook, waitFor } from '@testing-library/react';
import {act} from 'react';
import { useTodos } from './useTodos';
import { getToDos, markDone, markUnDone, deleteTodo } from '../api/ToDoService';
import { ToDo } from '../types/ToDo';
import { Page } from '../types/Page';
import { SearchAndFilter } from '../types/SearchAndFilter';

// Mock the API functions
jest.mock('../api/ToDoService', () => ({
    getToDos: jest.fn(),
    markDone: jest.fn(),
    markUnDone: jest.fn(),
    deleteTodo: jest.fn(),
}));

describe('useTodos Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetches todos on mount', async () => {
        const mockPage: Page = {
            curr: 1,
            total: 2,
            allAvgTime: '10m',
            lowAvgTime: '15m',
            mediumAvgTime: '20m',
            highAvgTime: '5m',
            data: [{ id: 1, text: 'Test Todo', done: false, priority: 1, doneDate: '', dueDate: '', creationDate: '' }],
        };

        (getToDos as jest.Mock).mockResolvedValue(mockPage);

        const { result } = renderHook(() => useTodos());

        // Await initial fetch
        await act(async () => { });

        expect(getToDos).toHaveBeenCalledWith(1, undefined, undefined, undefined, undefined, undefined);
        expect(result.current.todos).toEqual(mockPage.data);
        expect(result.current.page).toEqual(mockPage);
        expect(result.current.loading).toBe(false);
    });

    test('reloadTodos triggers fetch', async () => {
        const mockPage: Page = {
            curr: 1,
            total: 1,
            allAvgTime: '',
            lowAvgTime: '',
            mediumAvgTime: '',
            highAvgTime: '',
            data: [],
        };

        (getToDos as jest.Mock).mockResolvedValue(mockPage);

        const { result } = renderHook(() => useTodos());

        await act(async () => { });

        await act(async () => {
            result.current.reloadTodos();
        });

        expect(getToDos).toHaveBeenCalledTimes(2);
        expect(result.current.todos).toEqual(mockPage.data);
    });

    test('handleMarkDone marks a todo as done and reloads todos', async () => {
        (markDone as jest.Mock).mockResolvedValue({});
        (getToDos as jest.Mock).mockResolvedValue({ data: [] });

        const { result } = renderHook(() => useTodos());

        await act(async () => { });

        await act(async () => {
            result.current.handleMarkDone(1);
        });

        expect(markDone).toHaveBeenCalledWith(1);
        expect(getToDos).toHaveBeenCalledTimes(2); // Initial fetch + reload
    });

    test('handleMarkUnDone marks a todo as undone and reloads todos', async () => {
        (markUnDone as jest.Mock).mockResolvedValue({});
        (getToDos as jest.Mock).mockResolvedValue({ data: [] });

        const { result } = renderHook(() => useTodos());

        await act(async () => { });

        await act(async () => {
            result.current.handleMarkUnDone(1);
        });

        expect(markUnDone).toHaveBeenCalledWith(1);
        expect(getToDos).toHaveBeenCalledTimes(2); // Initial fetch + reload
    });

    test('handleDelete deletes a todo and reloads todos', async () => {
        (deleteTodo as jest.Mock).mockResolvedValue({});
        (getToDos as jest.Mock).mockResolvedValue({ data: [] });

        const { result } = renderHook(() => useTodos());

        await act(async () => { });

        await act(async () => {
            result.current.handleDelete(1);
        });

        expect(deleteTodo).toHaveBeenCalledWith(1);
        expect(getToDos).toHaveBeenCalledTimes(2); // Initial fetch + reload
    });

    test('changePage updates page number', async () => {
        const mockPage: Page = {
            curr: 2,
            total: 2,
            allAvgTime: '',
            lowAvgTime: '',
            mediumAvgTime: '',
            highAvgTime: '',
            data: [],
        };

        (getToDos as jest.Mock).mockResolvedValue(mockPage);

        const { result } = renderHook(() => useTodos());

        await act(async () => { });

        await act(async () => {
            result.current.changePage(2);
        });

        expect(getToDos).toHaveBeenCalledWith(2, undefined, undefined, undefined, undefined, undefined);
        expect(result.current.page.curr).toBe(2);
    });

    test('changeSearchAndFilter updates search and filter criteria and fetches todos', async () => {
        const mockSearchAndFilter: SearchAndFilter = { text: 'test', priority: 1 };

        (getToDos as jest.Mock).mockResolvedValue({ data: [] });

        const { result } = renderHook(() => useTodos());

        await act(() => {
            result.current.changeSearchAndFilter(mockSearchAndFilter);
        });

        expect(getToDos).toHaveBeenCalledWith(1, undefined, 1, 'test', undefined, undefined);
        expect(result.current.searchAndFilter).toEqual(mockSearchAndFilter);
    });

    test('handles errors during fetch', async () => {
        const mockError = new Error('Fetch failed');
        (getToDos as jest.Mock).mockRejectedValue(mockError);

        const { result } = renderHook(() => useTodos());

        await act(async () => { });

        expect(result.current.error).toBe('Fetch failed');
        expect(result.current.loading).toBe(false);
    });
});

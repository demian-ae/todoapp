import { useCallback, useEffect, useState } from 'react'
import { deleteTodo, getToDos, markDone, markUnDone } from '../api/ToDoService';
import { ToDo } from '../types/ToDo';
import { Page } from '../types/Page';
import { SearchAndFilter } from '../types/SearchAndFilter';

/**
 * Custom hook for managing to-do items and their state.
 * @returns {Object} The state and handlers for managing to-dos.
 */
export const useTodos = () => {
    const [page, setPage] = useState<Page>({ curr: 1, total: 1, allAvgTime: '', lowAvgTime: '', mediumAvgTime: '', highAvgTime: '', data: [] });
    const [searchAndFilter, setSearchAndFilter] = useState<SearchAndFilter>({});
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches the to-do items based on the current page and search/filter criteria.
     * @param {number} pageNum - The page number to fetch.
     * @param {SearchAndFilter} searchAndFilter - The search and filter criteria.
     */
    const fetchToDos = useCallback(async (pageNum: number, searchAndFilter: SearchAndFilter) => {
        console.log("fetch to dos: ", JSON.stringify(searchAndFilter));
        setLoading(true);
        try {
            const pageRes = await getToDos(
                pageNum, 
                searchAndFilter.done, 
                searchAndFilter.priority, 
                searchAndFilter.text, 
                searchAndFilter.isPriorityAsc, 
                searchAndFilter.isDueDateAsc
            );
            setTodos(pageRes.data);
            setPage(pageRes);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchToDos(page.curr, searchAndFilter);
    }, [fetchToDos]);

    /**
     * Reloads the to-do items based on the current page and search/filter criteria.
     */
    const reloadTodos = useCallback(() => {
        fetchToDos(page.curr, searchAndFilter);
    }, [fetchToDos, page.curr]);

    /**
     * Marks a to-do item as done.
     * @param {number} id - The ID of the to-do item to mark as done.
     */
    const handleMarkDone = async (id: number) => {
        try {
            const resp = await markDone(id);
            console.log("mark done success", resp);
        } catch (error) {
            // console.log(error); // <----------------------
        }
        reloadTodos();
    };

    /**
     * Marks a to-do item as undone.
     * @param {number} id - The ID of the to-do item to mark as undone.
     */
    const handleMarkUnDone = async (id: number) => {
        try {
            const resp = await markUnDone(id);
            console.log("mark done success", resp);
        } catch (error) {
            // console.log(error); // <----------------------
        }
        reloadTodos();
    };

    /**
     * Deletes a to-do item.
     * @param {number} id - The ID of the to-do item to delete.
     */
    const handleDelete = async (id: number) => {
        try {
            const resp = await deleteTodo(id);
            console.log("mark done success", resp);
        } catch (error) {
            console.log(error); // <----------------------
        }
        reloadTodos();
    };

    /**
     * Changes the current page and fetches the to-do items for the new page.
     * @param {number} pageNum - The new page number.
     */
    const changePage = (pageNum: number) => {
        setPage(prevPage => {
            const newPage = {
                ...prevPage,
                curr: pageNum
            };
            fetchToDos(pageNum, searchAndFilter); // Fetch todos for the new page number
            return newPage;
        });
        console.log("number: ", pageNum);
        console.log("change page:", JSON.stringify(page));
    };

    /**
     * Changes the search and filter criteria and fetches the to-do items based on the new criteria.
     * @param {SearchAndFilter} searchAndFilter - The new search and filter criteria.
     */
    const changeSearchAndFilter = (searchAndFilter: SearchAndFilter) => {
        console.log("useTodos: ", JSON.stringify(searchAndFilter));
        setSearchAndFilter(searchAndFilter);
        fetchToDos(1, searchAndFilter);
    };

    return { 
        page, 
        todos, 
        loading, 
        error, 
        searchAndFilter, 
        reloadTodos, 
        changePage, 
        handleMarkDone, 
        handleMarkUnDone, 
        handleDelete, 
        changeSearchAndFilter 
    };
};
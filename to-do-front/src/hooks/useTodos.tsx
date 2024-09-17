


import { useCallback, useEffect, useState } from 'react'
import { deleteTodo, getToDos, markDone, markUnDone } from '../api/ToDoService';
import { ToDo } from '../types/ToDo';
import { Page } from '../types/Page';

export const useTodos = () => {
  const [page, setPage] = useState<Page>({ curr: 1, total: 1, data: [] });
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchToDos = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const pageRes = await getToDos(pageNum);
      setTodos(pageRes.data);
      setPage(pageRes);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToDos(page.curr);
  }, [fetchToDos, page.curr]);

  const reloadTodos = useCallback(() => {
    fetchToDos(page.curr);
  }, [fetchToDos, page.curr]);

  const handleMarkDone = async (id: number) => {
    try {
      const resp = await markDone(id);
      console.log("mark done success", resp);
    } catch (error) {
      // console.log(error); // <----------------------
    }
    reloadTodos();
  };

  const handleMarkUnDone = async (id: number) => {
    try {
      const resp = await markUnDone(id);
      console.log("mark done success", resp);
    } catch (error) {
      // console.log(error); // <----------------------
    }
    reloadTodos();
  };

  const handleDelete = async (id: number) => {
    try {
      const resp = await deleteTodo(id);
      console.log("mark done success", resp);
    } catch (error) {
      console.log(error); // <----------------------
    }
    reloadTodos();
  };

  const changePage = (pageNum: number) => {
    setPage(prevPage => {
      const newPage = {
        ...prevPage,
        curr: pageNum
      };
      fetchToDos(pageNum); // Fetch todos for the new page number
      return newPage;
    });
    console.log("number: ", pageNum);
    console.log("change page:", JSON.stringify(page));
  };

  return { page, todos, loading, error, reloadTodos, changePage, handleMarkDone, handleMarkUnDone, handleDelete };
};
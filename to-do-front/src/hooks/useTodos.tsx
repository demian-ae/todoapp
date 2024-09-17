


import { useCallback, useEffect, useState } from 'react'
import { getToDos } from '../api/ToDoService';
import { ToDo } from '../types/ToDo';

export const useTodos = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchToDos = useCallback(async () => {
    setLoading(true);
    try {
      const toDosData = await getToDos();
      setTodos(toDosData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToDos();
  }, [fetchToDos]);

  const reloadTodos = useCallback(() => {
    fetchToDos();
  }, [fetchToDos]);

  return { todos, loading, error, reloadTodos, setTodos };
}

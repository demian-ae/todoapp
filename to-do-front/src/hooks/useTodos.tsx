


import { useEffect, useState } from 'react'
import { getToDos } from '../api/ToDoService';
import { ToDo } from '../types/ToDo';

export const useTodos = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchToDos = async () => {
        try {
          const toDosData = await getToDos();
          setTodos(toDosData);
        } catch(error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      }
  
      fetchToDos();
    }
    ,[]);

    return { todos, loading, error, setTodos };
}

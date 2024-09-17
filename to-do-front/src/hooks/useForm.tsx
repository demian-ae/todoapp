import { ChangeEvent, FormEvent, useState } from "react";
import { ToDo } from "../types/ToDo";
import { createToDo } from "../api/ToDoService";

// export function useForm<T>(initState: T){
export const useForm = (initState: ToDo) => {
    const [data, setFormulario] = useState(initState)

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;

        setFormulario({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (todo: ToDo, event: FormEvent) => {
        event.preventDefault();

        try {
            const toDosData = await createToDo(todo);
            console.log('Success: ', toDosData);
        } catch (error) {
            // setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setFormulario(ToDo());
            // setLoading(false);
        }
    }

    return {
        data,
        handleChange,
        handleSubmit,
        ...data
    }
}

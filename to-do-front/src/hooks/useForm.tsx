import { ChangeEvent, FormEvent, useState } from "react";
import { ToDo } from "../types/ToDo";
import { createToDo } from "../api/ToDoService";

/**
 * Custom hook for managing form state and handling form submission.
 * @param {ToDo} initState - The initial state of the form.
 * @returns {Object} The form state and handlers.
 */
export const useForm = (initState: ToDo) => {
    const [data, setFormulario] = useState(initState);

    /**
     * Handles the change event for form inputs.
     * @param {ChangeEvent<HTMLInputElement>} event - The change event.
     */
    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;

        setFormulario({
            ...data,
            [name]: value
        });
    };

    /**
     * Handles the form submit event.
     * @param {ToDo} todo - The to-do item to create.
     * @param {FormEvent} event - The form submit event.
     */
    const handleSubmit = async (todo: ToDo, event: FormEvent) => {
        event.preventDefault();

        try {
            const toDosData = await createToDo(todo);
            console.log('Success: ', toDosData);
        } catch (error) {
            // setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setFormulario(ToDo());
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
        ...data,
        setFormulario
    };
};

import { ToDo } from "../types/ToDo";
import { useForm } from "../hooks/useForm";
import { FormEvent, useState } from "react";

interface ToDoFormArgs {
    toggleForm: () => void,
    reloadTodos: () => void,
    existingTodo: ToDo | null;
}

export const ToDoForm = ({ toggleForm, reloadTodos, existingTodo }: ToDoFormArgs) => {
    const { text, dueDate, data, handleChange, handleSubmit, setFormulario } = useForm(existingTodo?existingTodo:ToDo());

    const title = existingTodo? "Edit to-do":"New to-do";
    const initialPriority = existingTodo? existingTodo.priority: "1";

    // Define the state for the selected value
    const [selectedValue, setSelectedValue] = useState(initialPriority);

    // Event handler for select change
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value
        setSelectedValue(selected);
        const priority = parseInt(selected);
        setFormulario({
            ...data,
            priority: priority
        })
    };

    const submitData = (ev: FormEvent) => {
        handleSubmit(data, ev);
        toggleForm();
        reloadTodos();
    }


    return (

        <div className="form-container">
            <div onClick={toggleForm} className="overlay"></div>
            <div className="card card-space border rounded ">
                <h2>{title}</h2>

                <form autoComplete="off" className="m-2" onSubmit={submitData}>
                    <div className="mb-1">
                        <label className="form-label">Task:</label>
                        <input
                            type="text"
                            name="text"
                            value={text}
                            className="form-control"
                            onChange={handleChange}
                        />
                        <label className="form-label m-2">Priority:</label>
                        <select name="priority" className="form-select" value={selectedValue} onChange={handleSelectChange}>
                            <option value={3}>High</option>
                            <option value={2}>Medium</option>
                            <option value={1}>Low</option>
                        </select>

                        <label className="form-label m-2">Due Date/Time</label>
                        <input
                            className="form-control"
                            type="datetime-local"
                            value={dueDate}
                            name="dueDate"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row text-end">
                        <div className="col">
                            <button
                                onClick={toggleForm}
                                className="btn btn-outline-danger m-1">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary m-1">
                                Save
                            </button>
                        </div>
                    </div>

                </form>

                {/* <span>{JSON.stringify(data)} + VALUE: {selectedValue}</span> */}


            </div>
        </div>
    )
}

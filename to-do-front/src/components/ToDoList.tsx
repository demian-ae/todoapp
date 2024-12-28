import {ToDo} from '../types/ToDo';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the icons you need

/**
 * Interface for the ToDoList component props.
 */
interface ToDoListArgs {
    todos: ToDo[],
    handleMarkDone: (id: number) => void,
    handleMarkUnDone: (id: number) => void,
    handleDelete: (id: number) => void,
    handleEdit: (todo: ToDo) => void
}

/**
 * Formats a date-time string to a more readable format.
 * @param {string} dateTime - The date-time string to format.
 * @returns {string} The formatted date-time string.
 */
function formatDateTime(dateTime: string): string {
    // Split the date-time string at the 'T'
    const [date, timeWithMilliseconds] = dateTime.split('T');
    
    // Split the time portion at the '.' to remove milliseconds
    const [time] = timeWithMilliseconds.split('.');

    // Extract hours from the time portion
    const [hours,minutes] = time.split(':');
    
    // Return the formatted string
    return `${date} ${hours}:${minutes}`;
}

/**
 * A component that displays a list of to-do items.
 * @param {ToDoListArgs} props - The properties object.
 * @param {ToDo[]} props.todos - Array of to-do items.
 * @param {Function} props.handleMarkDone - Function to mark a to-do item as done.
 * @param {Function} props.handleMarkUnDone - Function to mark a to-do item as undone.
 * @param {Function} props.handleDelete - Function to delete a to-do item.
 * @param {Function} props.handleEdit - Function to edit a to-do item.
 * @returns {JSX.Element} The rendered to-do list component.
 */
export const ToDoList = ({ todos, handleMarkDone, handleMarkUnDone, handleDelete, handleEdit }: ToDoListArgs): JSX.Element => {
    /**
     * Handles the mark done/undone action.
     * @param {boolean} isDone - The current done state of the to-do item.
     * @param {number | null} id - The ID of the to-do item.
     */
    const onMarkDone = (isDone: boolean, id: number | null) => {
        if (!id) { return }
        if (isDone) {
            handleMarkUnDone(id);
        } else {
            handleMarkDone(id);
        }
    }

    /**
     * Handles the delete action.
     * @param {number | null} id - The ID of the to-do item.
     */
    const onDelete = (id: number | null) => id && handleDelete(id);

    /**
     * Returns the appropriate text decoration class based on the done state.
     * @param {boolean} done - The done state of the to-do item.
     * @returns {string} The text decoration class.
     */
    const getTextDecorationClass = (done: boolean) => done ? 'text-decoration-line-through text-body-tertiary' : '';

    /**
     * Returns the string representation of the priority.
     * @param {number} priority - The priority level of the to-do item.
     * @returns {string} The string representation of the priority.
     */
    const getStringPriority = (priority: number) => {
        if (priority === 1) return 'Low';
        if (priority === 2) return 'Medium';
        if (priority === 3) return 'High';
    }

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope='col'>Mark</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Priority</th>
                    <th scope='col'>Due Date</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map((todo, index) => (
                        <tr key={index}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    className='form-check-input' 
                                    checked={todo.done}
                                    onChange={() => {onMarkDone(todo.done, todo.id)}}
                                    />
                                </td>
                            <td className={getTextDecorationClass(todo.done)} onClick={() => {onMarkDone(todo.done, todo.id)}}>{todo.text}</td>
                            <td className={getTextDecorationClass(todo.done)} onClick={() => {onMarkDone(todo.done, todo.id)}}>{getStringPriority(todo.priority)}</td>
                            <td className={getTextDecorationClass(todo.done)} onClick={() => {onMarkDone(todo.done, todo.id)}}>{todo.dueDate?formatDateTime(todo.dueDate):"None"}</td>
                            <td>
                                <button 
                                    onClick={() => onDelete(todo.id)} className='btn btn-outline-danger m-1'
                                    data-testid={`delete-button-${todo.id}`}
                                >
                                    <FaTrash />
                                </button>
                                <button 
                                    onClick={() => handleEdit(todo)} className='btn btn-outline-warning m-1'
                                    data-testid={`edit-button-${todo.id}`}
                                >
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

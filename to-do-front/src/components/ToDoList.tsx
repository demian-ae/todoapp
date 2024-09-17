import {ToDo} from '../types/ToDo';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the icons you need

interface ToDoListArgs {
    todos: ToDo[],
    removeTodo: (id: number) => void
    handleMarkDone: (id: number) => void,
    handleMarkUnDone: (id: number) => void,
    handleDelete: (id: number) => void,
    handleEdit: (todo: ToDo) => void
}

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


export const ToDoList = ({todos, handleMarkDone, handleMarkUnDone, handleDelete, handleEdit}: ToDoListArgs) => {
    const onMarkDone = (isDone: boolean, id:number | null) => {
        if(!id){ return }
        if(isDone){
            handleMarkUnDone(id);
        }else{ 
            handleMarkDone(id)
        }

    }

    const onDelete = (id:number | null) => {
        if(id){
            handleDelete(id);
        }
    }

    const getTextDecorationClass = (done: boolean) => done ? 'text-decoration-line-through text-body-tertiary' : '';

    const getStringPriority = (priority: number) => {
        if(priority===1) return 'Low'
        if(priority===2) return 'Medium'
        if(priority===3) return 'High'
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
                        <tr key={index} onClick={() => {onMarkDone(todo.done, todo.id)}}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    className='form-check-input' 
                                    checked={todo.done}
                                    onChange={() => {onMarkDone(todo.done, todo.id)}}
                                    />
                                </td>
                            <td className={getTextDecorationClass(todo.done)}>{todo.text}</td>
                            <td className={getTextDecorationClass(todo.done)}>{getStringPriority(todo.priority)}</td>
                            <td className={getTextDecorationClass(todo.done)}>{formatDateTime(todo.dueDate)}</td>
                            <td>
                                <button onClick={() => onDelete(todo.id)} className='btn btn-outline-danger m-1'><FaTrash /></button>
                                <button onClick={() => handleEdit(todo)} className='btn btn-outline-warning m-1'><FaEdit /></button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>

        </table>
    )
}

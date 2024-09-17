import {ToDo} from '../types/ToDo';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the icons you need

interface ToDoListArgs {
    todos: ToDo[],
    removeTodo: (id: number) => void
    handleMarkDone: (id: number) => void,
    handleMarkUnDone: (id: number) => void,
}


export const ToDoList = ({todos, removeTodo, handleMarkDone, handleMarkUnDone}: ToDoListArgs) => {
    const onMarkDone = (isDone: boolean, id:number | null) => {
        if(!id){ return }
        if(isDone){
            handleMarkUnDone(id);
        }else{ 
            handleMarkDone(id)
        }

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
                            <td>{todo.done?'true':'false'} {todo.text}</td>
                            <td>{todo.priority}</td>
                            <td>{todo.dueDate}</td>
                            <td>
                                <button className='btn btn-outline-danger m-1'><FaTrash /></button>
                                <button className='btn btn-outline-warning m-1'><FaEdit /></button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>

        </table>
    )
}

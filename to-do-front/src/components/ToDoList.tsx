import {ToDo} from '../types/ToDo';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the icons you need

interface ToDoListArgs {
    todos: ToDo[],
    removeTodo: (index: number) => void
}


export const ToDoList = ({todos, removeTodo}: ToDoListArgs) => {
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
                            <td><input type="checkbox" className='form-check-input' /></td>
                            <td>{todo.text}</td>
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

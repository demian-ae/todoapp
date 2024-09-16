import {ToDo} from '../types/ToDo';

interface ToDoListArgs {
    todos: ToDo[],
    removeTodo: (index: number) => void
}


export const ToDoList = ({todos, removeTodo}: ToDoListArgs) => {
    return (
        <ul className="list-group mt-2">
        {todos.map((todo, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                    {todo.text}, {todo.dueDate}, {todo.priority}, {todo.done && "hecho"}
                </span>
                <button className="btn btn-danger btn-sm" onClick={() => removeTodo(index)}>Delete</button>
            </li>
        ))}
        </ul>
    )
}

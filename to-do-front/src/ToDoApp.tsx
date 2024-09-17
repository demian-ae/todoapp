import { useState } from "react";
import { ToDoList, ToDoForm, Search, AddToDoButton } from "./components";
import "./components/ModalForm.css"
import { useTodos } from "./hooks/useTodos";
import { ToDo } from "./types/ToDo";


function ToDoApp() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const { todos, loading, error, setTodos, reloadTodos, handleMarkDone, handleMarkUnDone, handleDelete} = useTodos();
  const [editingTodo, setEditingTodo] = useState<ToDo | null>(null);
  
  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
  
  const editTodo = (todo: ToDo) => {
    console.log(JSON.stringify(todo))
    setEditingTodo(todo);
    setIsFormOpened(true);
  };
  

  const toggleForm = () => { setIsFormOpened(!isFormOpened) }

  return (
    <>
      <div className="container">
        <h1 className="mb-4">To-Do App</h1>
        <Search />
        <AddToDoButton toggleForm={() => {
          setEditingTodo(null);
          toggleForm();
        }}/>

        {/* <ToDoList todos={todos} removeTodo={removeTodo} /> */}

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ToDoList 
          todos={todos} 
          removeTodo={removeTodo} 
          handleMarkDone={handleMarkDone} 
          handleMarkUnDone={handleMarkUnDone} 
          handleDelete={handleDelete}
          handleEdit={editTodo}  
        />
      </div>

      {/* Modal */}
      {isFormOpened && (<ToDoForm toggleForm={() => {toggleForm(); reloadTodos();}} reloadTodos={reloadTodos} existingTodo={editingTodo} />)}

    </>
  );
}

export default ToDoApp;

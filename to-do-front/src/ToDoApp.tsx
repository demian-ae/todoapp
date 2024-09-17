import { useState } from "react";
import { ToDoList, ToDoForm, Search, AddToDoButton } from "./components";
import "./components/ModalForm.css"
import { useTodos } from "./hooks/useTodos";


function ToDoApp() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const { todos, loading, error, setTodos, reloadTodos, handleMarkDone, handleMarkUnDone, handleDelete} = useTodos();

  // const addTodo = (todo: string) => {
  //   setTodos([...todos, todo]);
  // };

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
  

  const toggleForm = () => { setIsFormOpened(!isFormOpened) }

  return (
    <>
      <div className="container">
        <h1 className="mb-4">To-Do App</h1>
        <Search />
        <AddToDoButton toggleForm={toggleForm}/>

        {/* <ToDoList todos={todos} removeTodo={removeTodo} /> */}

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ToDoList todos={todos} removeTodo={removeTodo} handleMarkDone={handleMarkDone} handleMarkUnDone={handleMarkUnDone} handleDelete={handleDelete}/>
      </div>

      {/* Modal */}
      {isFormOpened && (<ToDoForm toggleForm={toggleForm} reloadTodos={reloadTodos} />)}

    </>
  );
}

export default ToDoApp;

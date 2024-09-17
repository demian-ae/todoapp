import { useState } from "react";
import { ToDoList, ToDoForm, Search, AddToDoButton, Paginator, Metrics, OrderButtons } from "./components";
import "./components/ModalForm.css"
import { useTodos } from "./hooks/useTodos";
import { ToDo } from "./types/ToDo";


function ToDoApp() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const { page, todos, loading, error, searchAndFilter, changePage, reloadTodos, handleMarkDone, handleMarkUnDone, handleDelete, changeSearchAndFilter } = useTodos();
  const [editingTodo, setEditingTodo] = useState<ToDo | null>(null);

  const editTodo = (todo: ToDo) => {
    console.log(JSON.stringify(todo))
    setEditingTodo(todo);
    setIsFormOpened(true);
  };


  const toggleForm = () => { setIsFormOpened(!isFormOpened) }

  return (
    <>
      <div className="container">
        <h2 className="mb-4">To-Do App</h2>
        <Search onSearch={changeSearchAndFilter} />
        <div className="row">
          <div className="col justify-content-start">
            <OrderButtons currentSearchAndFilter={searchAndFilter} changeSearchAndFilter={changeSearchAndFilter} />
          </div>
          <div className="col text-end">
            <AddToDoButton toggleForm={() => {
              setEditingTodo(null);
              toggleForm();
            }} />
          </div>
        </div>


        {/* <ToDoList todos={todos} removeTodo={removeTodo} /> */}

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ToDoList
          todos={todos}
          handleMarkDone={handleMarkDone}
          handleMarkUnDone={handleMarkUnDone}
          handleDelete={handleDelete}
          handleEdit={editTodo}
        />
        <Paginator currPage={page} changePage={changePage} />
        <Metrics all={page.allAvgTime} low={page.lowAvgTime} medium={page.mediumAvgTime} high={page.highAvgTime} />
      </div>

      {/* Modal */}
      {isFormOpened && (<ToDoForm toggleForm={() => { toggleForm(); reloadTodos(); }} reloadTodos={reloadTodos} existingTodo={editingTodo} />)}

    </>
  );
}

export default ToDoApp;

import { useState } from "react";
import { ToDoList, ToDoForm, Search, AddToDoButton, Paginator, Metrics, OrderButtons } from "./components";
import "./components/ModalForm.css"
import { useTodos } from "./hooks/useTodos";
import { ToDo } from "./types/ToDo";


/**
 * The main component for the To-Do application.
 * Manages the state and handles the logic for displaying and interacting with to-dos.
 */
function ToDoApp() {
	const [isFormOpened, setIsFormOpened] = useState(false);
	const { page, todos, loading, error, searchAndFilter, changePage, reloadTodos, handleMarkDone, handleMarkUnDone, handleDelete, changeSearchAndFilter } = useTodos();
	const [editingTodo, setEditingTodo] = useState<ToDo | null>(null);

	/**
	 * Opens the form for editing a to-do item.
	 * @param {ToDo} todo - The to-do item to be edited.
	 */
	const editTodo = (todo: ToDo) => {
		console.log(JSON.stringify(todo));
		setEditingTodo(todo);
		setIsFormOpened(true);
	};

	/**
	 * Toggles the visibility of the to-do form.
	 */
	const toggleForm = () => {
		setIsFormOpened(!isFormOpened);
	};

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

			{isFormOpened && (
				<ToDoForm
					toggleForm={() => {
						toggleForm();
						reloadTodos();
					}}
					reloadTodos={reloadTodos}
					existingTodo={editingTodo}
				/>
			)}
		</>
	);
}

export default ToDoApp;
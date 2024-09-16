import { Search } from "."

interface ToDoFormArgs {
    toggleForm: () => void
}


export const ToDoForm = ({toggleForm}: ToDoFormArgs) => {
  return (
    
    <div className="form-container">
        <div onClick={toggleForm} className="overlay"></div>
        <div className="card card-space border rounded ">
            <h2>New to-do</h2>
            <Search />
            <div className="row text-end">
                
                <div className="col">
                    <button 
                        onClick={toggleForm}
                        className="btn btn-outline-danger m-1">
                        Cancel
                    </button>
                    <button 
                        onClick={toggleForm}
                        className="btn btn-primary m-1">
                        Add
                    </button>
                </div>
            </div>
        </div>         
    </div>
  )
}

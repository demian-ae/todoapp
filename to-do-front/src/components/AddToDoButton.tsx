interface AddToDoArgs {
    toggleForm: () => void
}

export const AddToDoButton = ({toggleForm}: AddToDoArgs) => {
  return (
    <div className="row text-end">
        <div className="col">
            <button
                onClick={toggleForm}
                className="btn btn-primary m-2 ">Add to-do</button>
        </div>
    </div>
  )
}

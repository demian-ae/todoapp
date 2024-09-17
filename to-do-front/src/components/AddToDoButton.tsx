import { IoMdAddCircleOutline } from "react-icons/io";

interface AddToDoArgs {
    toggleForm: () => void
}

export const AddToDoButton = ({toggleForm}: AddToDoArgs) => {
  return (

            <button
                onClick={toggleForm}
                className="btn btn-primary m-2 "><IoMdAddCircleOutline /> Add to-do</button>

  )
}

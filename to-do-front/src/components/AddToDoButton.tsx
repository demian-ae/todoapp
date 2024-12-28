import { IoMdAddCircleOutline } from "react-icons/io";

/**
 * Props for the AddToDoButton component.
 */
interface AddToDoArgs {
  /**
   * Function to toggle the visibility of the to-do form.
   */
  toggleForm: () => void;
}

/**
* A button component that triggers the display of the to-do form.
* @param {AddToDoArgs} props - The properties object.
* @param {Function} props.toggleForm - Function to toggle the form visibility.
* @returns {JSX.Element} The rendered button component.
*/
export const AddToDoButton = ({ toggleForm }: AddToDoArgs): JSX.Element => {
return (
  <button
      onClick={toggleForm}
      className="btn btn-primary m-2">
        <IoMdAddCircleOutline data-testid="icon-add-circle" /> Add to-do
  </button>
);
};
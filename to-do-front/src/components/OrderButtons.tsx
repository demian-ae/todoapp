import { useEffect, useState } from "react"
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";
import { SearchAndFilter } from "../types/SearchAndFilter";

/**
 * Returns the appropriate sort icon based on the order state.
 * @param {string} order - The current order state.
 * @returns {JSX.Element} The sort icon component.
 */
const sortIcon = (order: string): JSX.Element => {
    if (order === "none") {
        return (<></>);
    } else if (order === "asc") {
        return (<HiOutlineSortDescending />);
    } else if (order === "desc") {
        return (<HiOutlineSortAscending />);
    }
    return (<></>);
}

/**
 * Returns the appropriate button style based on the order state.
 * @param {string} order - The current order state.
 * @returns {string} The button style class.
 */
const getStyle = (order: string): string => {
    if (order === "none") {
        return "btn m-2";
    }
    return "btn m-2 active";
}

/**
 * Props for the OrderButtons component.
 */
interface OrderButtonsArgs {
    currentSearchAndFilter: SearchAndFilter;
    changeSearchAndFilter: (searchAndFilter: SearchAndFilter) => void;
}

/**
 * A component that provides buttons to order the to-do list by priority and due date.
 * @param {OrderButtonsArgs} props - The properties object.
 * @param {SearchAndFilter} props.currentSearchAndFilter - The current search and filter state.
 * @param {Function} props.changeSearchAndFilter - Function to update the search and filter state.
 * @returns {JSX.Element} The rendered order buttons component.
 */
export const OrderButtons = ({ currentSearchAndFilter, changeSearchAndFilter }: OrderButtonsArgs): JSX.Element => {
    const [orderPriority, setPriority] = useState<string>("none");
    const [orderDueDate, setDueDate] = useState<string>("none");

    /**
     * Toggles the priority order state.
     */
    const handleTogglePriority = () => {
        if (orderPriority === "none") {
            setPriority("asc");
        } else if (orderPriority === "asc") {
            setPriority("desc");
        } else if (orderPriority === "desc") {
            setPriority("none");
        }
    }

    /**
     * Toggles the due date order state.
     */
    const handleToggleDueDate = () => {
        if (orderDueDate === "none") {
            setDueDate("asc");
        } else if (orderDueDate === "asc") {
            setDueDate("desc");
        } else if (orderDueDate === "desc") {
            setDueDate("none");
        }
    }

    /**
     * Updates the search and filter state based on the order state.
     * This effect is triggered when the order state changes.
     * It can have order by priority, due date, both or none.
     */
    useEffect(() => {
        let aux = { ...currentSearchAndFilter };
        if (orderPriority !== "none") {
            aux.isPriorityAsc = orderPriority === "asc";
        } else {
            aux.isPriorityAsc = undefined;
        }

        if (orderDueDate !== "none") {
            aux.isDueDateAsc = orderDueDate === "asc";
        } else {
            aux.isDueDateAsc = undefined;
        }
        changeSearchAndFilter(aux);
    }, [orderPriority, orderDueDate]);

    return (
        <div className="row text-star">
            <div className="col">
                <span>Order by: </span>
                <button
                    onClick={handleTogglePriority}
                    className={getStyle(orderPriority)}>
                    Priority {sortIcon(orderPriority)}
                </button>
                <button
                    onClick={handleToggleDueDate}
                    className={getStyle(orderDueDate)}>
                    Due Date {sortIcon(orderDueDate)}
                </button>
            </div>
        </div>
    );
}
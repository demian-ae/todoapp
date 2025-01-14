import { ChangeEvent, FormEvent, useState } from "react";
import { SearchAndFilter } from "../types/SearchAndFilter";

/**
 * Interface for the Search component props.
 */
interface SearchArgs {
    onSearch: (searchAndFilter: SearchAndFilter) => void;
}

/**
 * A component that provides a search and filter form for to-dos.
 * @param {SearchArgs} props - The properties object.
 * @param {Function} props.onSearch - Function to handle the search and filter action.
 * @returns {JSX.Element} The rendered search component.
 */
export const Search = ({ onSearch }: SearchArgs): JSX.Element => {
    const [searchAndFilter, setSearchAndFilter] = useState<SearchAndFilter>({});
    const [priority, setPriority] = useState(0);
    const [done, setDone] = useState<string>();

    /**
     * Handles the change event for the text input.
     * @param {ChangeEvent<HTMLInputElement>} event - The change event.
     */
    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;

        setSearchAndFilter({
            ...searchAndFilter,
            [name]: value.length === 0 ? undefined : value,
        });
    };

    /**
     * Handles the change event for the priority select input.
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event.
     */
    const handleSelectPriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        const priority = parseInt(selected);
        setPriority(priority);
        setSearchAndFilter({
            ...searchAndFilter,
            priority: priority === 0 ? undefined : priority,
        });
    };

    /**
     * Handles the change event for the done state select input.
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event.
     */
    const handleSelectDoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setDone(selected);
        if (selected === "all") {
            setSearchAndFilter({
                ...searchAndFilter,
                done: undefined,
            });
        } else {
            setSearchAndFilter({
                ...searchAndFilter,
                done: selected === "done",
            });
        }
    };

    /**
     * Handles the form submit event.
     * @param {FormEvent} event - The form submit event.
     */
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        onSearch(searchAndFilter);
    };

    return (
        <>
            <div className="row align-items-center p-2 border rounded m-2 bg-dark">
                <div className="col-2">
                    <h4>Search: </h4>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off" className="col-10 d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control me-2"
                        name="text"
                        placeholder="Search"
                        value={searchAndFilter?.text}
                        onChange={handleChange}
                    />

                    <label htmlFor="priority" className="form-label mx-2">
                        Priority:
                    </label>
                    <select
                        id="priority" // Add id here
                        name="priority"
                        className="form-select w-25"
                        aria-label="Priority" // Use aria-label for accessibility
                        value={priority}
                        onChange={handleSelectPriorityChange}
                    >
                        <option value={0}>All</option>
                        <option value={3}>High</option>
                        <option value={2}>Medium</option>
                        <option value={1}>Low</option>
                    </select>

                    <label htmlFor="state" className="form-label mx-2">
                        State:
                    </label>
                    <select
                        id="state" // Add id here
                        name="state"
                        className="form-select w-25"
                        aria-label="State" // Use aria-label for accessibility
                        value={done}
                        onChange={handleSelectDoneChange}
                    >
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="undone">Undone</option>
                    </select>

                    <button className="btn btn-outline-primary mx-2" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </>
    );
};
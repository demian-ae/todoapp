import { ChangeEvent, FormEvent, useState } from "react"
import { SearchAndFilter } from "../types/SearchAndFilter";

interface SearchArgs {
    onSearch: (searchAndFilter: SearchAndFilter) => void
}

export const Search = ({onSearch}: SearchArgs) => {
    const [searchAndFilter, setSearchAndFilter] = useState<SearchAndFilter>({});
    const [priority, setPriority] = useState(0);
    const [done, setDone] = useState<string>();

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;

        setSearchAndFilter({
            ...searchAndFilter,
            [name]: value.length===0?undefined:value
        })
    }

    const handleSelectPriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        const priority = parseInt(selected);
        setPriority(priority);
        setSearchAndFilter({
            ...searchAndFilter,
            priority: priority===0?undefined:priority
        })
    };

    const handleSelectDoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setDone(selected);
        if(selected==="all"){
            setSearchAndFilter({
                ...searchAndFilter,
                done: undefined
            })
        } else{
            setSearchAndFilter({
                ...searchAndFilter,
                done: selected==="done"
            })
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log("search component: ", JSON.stringify(searchAndFilter))
        onSearch(searchAndFilter);
    }


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
                    onChange={handleChange}/>

                <label className="form-label mx-2">Priority:</label>
                <select name="priority" className="form-select w-25" aria-label="All" value={priority} onChange={handleSelectPriorityChange} >
                    <option value={0}>All</option>
                    <option value={3}>High</option>
                    <option value={2}>Medium</option>
                    <option value={1}>Low</option>
                </select>

                <label className="form-label mx-2">State:</label>
                <select name="state" className="form-select w-25" aria-label="All" value={done} onChange={handleSelectDoneChange}>
                    <option value="all">All</option>
                    <option value="done">Done</option>
                    <option value="undone">Undone</option>
                </select>

                <button className="btn btn-outline-primary mx-2" type="submit">Search</button>
            </form>
        </div>
        {/* <span>{JSON.stringify(searchAndFilter)}</span> */}
        </>
    )
}

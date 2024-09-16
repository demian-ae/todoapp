

export const Search = () => {
    return (
        <div className="row align-items-center p-2 border rounded m-2 bg-dark">
            <div className="col-2">
                <h4>Search: </h4>
            </div>
            <form autoComplete="off" className="col-10 d-flex align-items-center">

                <input type="text" className="form-control me-2" name="q" placeholder="Search" />

                <label className="form-label mx-2">Priority:</label>
                <select name="priority" className="form-select w-25" aria-label="All">
                    <option value="all">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <label className="form-label mx-2">State:</label>
                <select name="state" className="form-select w-25" aria-label="All">
                    <option value="all">All</option>
                    <option value="high">Done</option>
                    <option value="medium">Undone</option>
                </select>

                <button className="btn btn-outline-primary mx-2">Search</button>
            </form>
        </div>
    )
}

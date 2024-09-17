import { useEffect, useState } from "react"
import { Page } from "../types/Page"

interface PaginatorArgs {
    currPage: Page,
    changePage: (pageNum: number) => void
}

export const Paginator = ({currPage, changePage}: PaginatorArgs) => {
    const [pages, setPages] = useState<number[]>([]);

    useEffect(() =>{
        let aux: number[] = [];
        for(let i=1; i<currPage.total+1; i++){
            aux.push(i);
        }
        setPages(aux);
    }
    ,[currPage]);

    const handlePageChange = (pageNum: number) => {
        if (pageNum !== currPage.curr) {
            changePage(pageNum);
        }
    };

    const handlePrevious = () => {
        if (currPage.curr > 1) {
            changePage(currPage.curr - 1);
        }
    };

    const handleNext = () => {
        if (currPage.curr < currPage.total) {
            changePage(currPage.curr + 1);
        }
    };

    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${currPage.curr === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={(e) => { e.preventDefault(); handlePrevious(); }}>
                        Previous
                    </button>
                </li>
                {pages.map((pageNum) => (
                    <li
                        key={pageNum}
                        className={`page-item ${pageNum === currPage.curr ? 'active' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={(e) => { e.preventDefault(); handlePageChange(pageNum); }}
                        >
                            {pageNum}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currPage.curr === currPage.total ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={(e) => { e.preventDefault(); handleNext(); }}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}

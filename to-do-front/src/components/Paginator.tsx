import { useEffect, useState } from "react"
import { Page } from "../types/Page"

/**
 * Interface for the Paginator component props.
 */
interface PaginatorArgs {
    currPage: Page,
    changePage: (pageNum: number) => void
}

/**
 * A component that provides pagination controls.
 * @param {PaginatorArgs} props - The properties object.
 * @param {Page} props.currPage - The current page information.
 * @param {Function} props.changePage - Function to change the current page.
 * @returns {JSX.Element} The rendered paginator component.
 */
export const Paginator = ({ currPage, changePage }: PaginatorArgs): JSX.Element => {
    // State to store the page numbers.
    const [pages, setPages] = useState<number[]>([]);

    // Update the page numbers when the current page changes.
    useEffect(() => {
        let aux: number[] = [];
        for (let i = 1; i < currPage.total + 1; i++) {
            aux.push(i);
        }
        setPages(aux);
    }, [currPage]);

    /**
     * Handles the page change event.
     * @param {number} pageNum - The new page number.
     */
    const handlePageChange = (pageNum: number) => {
        if (pageNum !== currPage.curr) {
            changePage(pageNum);
        }
    };

    /**
     * Handles the previous page event.
     */
    const handlePrevious = () => {
        if (currPage.curr > 1) {
            changePage(currPage.curr - 1);
        }
    };

    /**
     * Handles the next page event.
     */
    const handleNext = () => {
        if (currPage.curr < currPage.total) {
            changePage(currPage.curr + 1);
        }
    };

    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation example">
            <ul className="pagination">
                <li 
                    className={`page-item ${currPage.curr === 1 ? 'disabled' : ''}`}
                    data-testid="previous-button"
                >
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
                <li 
                    className={`page-item ${currPage.curr === currPage.total ? 'disabled' : ''}`}
                    data-testid="next-button"
                >
                    <button className="page-link" onClick={(e) => { e.preventDefault(); handleNext(); }}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};
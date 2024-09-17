
import { useEffect, useState } from "react"
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";
import { SearchAndFilter } from "../types/SearchAndFilter";

const sortIcon = (order: string) => {
    if (order === "none") {
        return (<></>)
    } else if (order === "asc") {
        return (<HiOutlineSortDescending />)
    } else if (order === "desc") {
        return (<HiOutlineSortAscending />)
    }
}

const getStyle = (order: string): string => {
    if (order === "none") {
        return "btn m-2";
    } 
    return "btn m-2 active";
}


interface OrderButtonsArgs {
    currentSearchAndFilter: SearchAndFilter;
    changeSearchAndFilter: (searchAndFilter: SearchAndFilter) => void
}


export const OrderButtons = ({ currentSearchAndFilter, changeSearchAndFilter }: OrderButtonsArgs) => {
    const [orderPriority, setPriority] = useState<string>("none");
    const [orderDueDate, setDueDate] = useState<string>("none");

    const handleTogglePriority = () => {
        if (orderPriority === "none") {
            setPriority("asc");
        } else if (orderPriority === "asc") {
            setPriority("desc")
        } else if (orderPriority === "desc") {
            setPriority("none")
        }
    }
    const handleToggleDueDate = () => {
        
        if (orderDueDate === "none") {
            setDueDate("asc");
        } else if (orderDueDate === "asc") {
            setDueDate("desc")
        } else if (orderDueDate === "desc") {
            setDueDate("none")
        }
    }

    useEffect(() => {
        console.log("current",currentSearchAndFilter)
        let aux = {...currentSearchAndFilter};
        if(orderPriority!=="none"){
            if(orderPriority==="asc"){
                aux.isPriorityAsc=true;
            }else{
                aux.isPriorityAsc=false;
            }
        }else{
            aux.isPriorityAsc=undefined;
        }

        if(orderDueDate!=="none"){
            if(orderDueDate==="asc"){
                aux.isDueDateAsc=true;
            }else{
                aux.isDueDateAsc=false;
            }
        }else{
            aux.isDueDateAsc=undefined;
        }
        console.log("let",aux)
        changeSearchAndFilter(aux);
    }, [orderPriority, orderDueDate])

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
    )
}

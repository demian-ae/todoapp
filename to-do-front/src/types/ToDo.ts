export interface ToDo {
    id: number | null;
    text: string;
    done: boolean;
    priority: number;
    doneDate: string;
    dueDate: string;
    creationDate: string;
}

function getCurrentDatetime(): string {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function ToDo(): ToDo {
    return {
        id: null,
        text: '',
        done: false,
        priority: 1,
        doneDate: '',
        dueDate: '',
        creationDate: getCurrentDatetime()
    };
}
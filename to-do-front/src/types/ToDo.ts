/**
 * Returns the current date and time in the format YYYY-MM-DDTHH:MM.
 * @returns {string} The current date and time.
 */
function getCurrentDatetime(): string {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Interface representing a to-do item.
 */
export interface ToDo {
    /**
     * The unique identifier of the to-do item.
     * Null if the to-do item is not yet saved.
     */
    id: number | null;
    
    /**
     * The text description of the to-do item.
     */
    text: string;
    
    /**
     * The completion status of the to-do item.
     * True if the to-do item is completed, false otherwise.
     */
    done: boolean;
    
    /**
     * The priority level of the to-do item.
     * 1 for low priority, 2 for medium priority, 3 for high priority.
     */
    priority: number;
    
    /**
     * The date and time when the to-do item was marked as done.
     * Empty string if the to-do item is not yet completed.
     */
    doneDate: string;
    
    /**
     * The due date and time for the to-do item.
     * Empty string if there is no due date.
     */
    dueDate: string;
    
    /**
     * The date and time when the to-do item was created.
     */
    creationDate: string;
}

/**
 * Creates a new to-do item with default values.
 * @returns {ToDo} A new to-do item.
 */
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
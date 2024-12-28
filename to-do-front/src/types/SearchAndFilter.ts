/**
 * Interface representing the search and filter criteria for to-do items.
 */
export interface SearchAndFilter { 
    /**
     * Filter by completion status.
     * If true, only completed tasks are included.
     * If false, only incomplete tasks are included.
     * If undefined, all tasks are included.
     */
    done?: boolean; 
    
    /**
     * Filter by priority level.
     * 1 for low priority, 2 for medium priority, 3 for high priority.
     * If undefined, tasks of all priorities are included.
     */
    priority?: number; 
    
    /**
     * Filter by text search.
     * If defined, only tasks containing this text are included.
     */
    text?: string;
    
    /**
     * Sort by priority in ascending order.
     * If true, tasks are sorted by priority in ascending order.
     * If false, tasks are sorted by priority in descending order.
     * If undefined, no sorting by priority is applied.
     */
    isPriorityAsc?: boolean;
    
    /**
     * Sort by due date in ascending order.
     * If true, tasks are sorted by due date in ascending order.
     * If false, tasks are sorted by due date in descending order.
     * If undefined, no sorting by due date is applied.
     */
    isDueDateAsc?: boolean;
}
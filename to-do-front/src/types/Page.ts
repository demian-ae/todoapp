import { ToDo } from "./ToDo";

/**
 * Interface representing a paginated response for to-do items.
 */
export interface Page {
    /**
     * The current page number.
     */
    curr: number;
    
    /**
     * The total number of pages.
     */
    total: number;
    
    /**
     * The average time to complete all tasks.
     */
    allAvgTime: string;
    
    /**
     * The average time to complete low priority tasks.
     */
    lowAvgTime: string;
    
    /**
     * The average time to complete medium priority tasks.
     */
    mediumAvgTime: string;
    
    /**
     * The average time to complete high priority tasks.
     */
    highAvgTime: string;
    
    /**
     * The array of to-do items for the current page.
     */
    data: ToDo[];
}
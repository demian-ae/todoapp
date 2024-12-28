package com.example.todo.model;

import java.util.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model class representing a paginated response for ToDo items.
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Page {

    /**
     * The current page number.
     */
    private int curr;

    /**
     * The total number of pages.
     */
    private int total;

    /**
     * The average time for all ToDo items.
     */
    private String allAvgTime;

    /**
     * The average time for Low priority ToDo items.
     */
    private String lowAvgTime;

    /**
     * The average time for Medium priority ToDo items.
     */
    private String mediumAvgTime;

    /**
     * The average time for High priority ToDo items.
     */
    private String highAvgTime;

    /**
     * The collection of ToDo items on the current page.
     */
    private Collection<ToDo> data;
}

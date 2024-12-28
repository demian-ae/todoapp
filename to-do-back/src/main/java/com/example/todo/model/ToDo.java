package com.example.todo.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model class representing a ToDo item.
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ToDo {

    /**
     * The unique identifier of the ToDo item.
     */
    private Long id;

    /**
     * The text description of the ToDo item.
     */
    private String text;

    /**
     * The completion status of the ToDo item.
     */
    private boolean done;

    /**
     * The priority level of the ToDo item. 1 - Low, 2 - Medium, 3 - High.
     */
    private Integer priority;

    /**
     * The date and time when the ToDo item was marked as done.
     */
    private LocalDateTime doneDate;

    /**
     * The due date and time for the ToDo item.
     */
    private LocalDateTime dueDate;

    /**
     * The creation date and time of the ToDo item.
     */
    private LocalDateTime creationDate;
}
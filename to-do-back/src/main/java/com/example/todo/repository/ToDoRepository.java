package com.example.todo.repository;

import java.util.Optional;

import com.example.todo.model.Page;
import com.example.todo.model.ToDo;

/**
 * Repository interface for managing ToDo items.
 */
public interface ToDoRepository {

    /**
     * Saves a ToDo item.
     *
     * @param toDo the ToDo item to save
     * @return the saved ToDo item
     */
    ToDo save(ToDo toDo);

    /**
     * Finds a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to find
     * @return an Optional containing the ToDo item, or empty if not found
     */
    Optional<ToDo> findById(Long id);

    /**
     * Retrieves a paginated list of ToDo items based on various filters.
     *
     * @param pageNum the page number to retrieve
     * @param nameFilter the text to filter ToDo items by
     * @param priorityFilter the priority level to filter ToDo items by
     * @param doneFilter the completion status to filter ToDo items by
     * @param isPriorityAsc whether to sort by priority in ascending order
     * @param isDueDateAsc whether to sort by due date in ascending order
     * @return a paginated list of ToDo items
     */
    Page findAll(int pageNum, String nameFilter, Integer priorityFilter, Boolean doneFilter, Boolean isPriorityAsc, Boolean isDueDateAsc);

    /**
     * Deletes a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to delete
     */
    void deleteById(Long id);

    /**
     * Updates a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to update
     * @param toDo the updated ToDo item
     * @return an Optional containing the updated ToDo item, or empty if not found
     */
    Optional<ToDo> updateById(Long id, ToDo toDo);

    /**
     * Marks a ToDo item as done by its ID.
     *
     * @param id the ID of the ToDo item to mark as done
     */
    void markAsDoneById(Long id);

    /**
     * Marks a ToDo item as undone by its ID.
     *
     * @param id the ID of the ToDo item to mark as undone
     */
    void markUndoneById(Long id);
}
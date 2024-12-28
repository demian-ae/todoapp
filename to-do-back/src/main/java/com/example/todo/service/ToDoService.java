package com.example.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todo.model.Page;
import com.example.todo.model.ToDo;
import com.example.todo.repository.ToDoLocalRepository;

import java.util.Optional;

/**
 * Service class for managing ToDos.
 */
@Service
public class ToDoService {

    @Autowired
    private ToDoLocalRepository toDoRepository;

    /**
     * Saves a new ToDo item.
     *
     * @param toDo the ToDo item to save
     * @return the saved ToDo item
     */
    public ToDo saveToDo(ToDo toDo) {
        return toDoRepository.save(toDo);
    }

    /**
     * Retrieves a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to retrieve
     * @return an Optional containing the ToDo item, or empty if not found
     */
    public Optional<ToDo> getToDoById(Long id) {
        return toDoRepository.findById(id);
    }

    /**
     * Retrieves a paginated list of ToDo items based on various filters.
     *
     * @param page the page number to retrieve
     * @param text the text to filter ToDo items by
     * @param priorityFilter the priority level to filter ToDo items by
     * @param doneFilter the completion status to filter ToDo items by
     * @param isPriorityAsc whether to sort by priority in ascending order
     * @param isDueDateAsc whether to sort by due date in ascending order
     * @return a paginated list of ToDo items
     */
    public Page getAllToDos(int page, String text, Integer priorityFilter, Boolean doneFilter, Boolean isPriorityAsc, Boolean isDueDateAsc) {
        return toDoRepository.findAll(page, text, priorityFilter, doneFilter, isPriorityAsc, isDueDateAsc);
    }

    /**
     * Deletes a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to delete
     */
    public void deleteToDoById(Long id) {
        toDoRepository.deleteById(id);
    }

    /**
     * Updates a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to update
     * @param toDo the updated ToDo item
     * @return an Optional containing the updated ToDo item, or empty if not found
     */
    public Optional<ToDo> updateById(Long id, ToDo toDo) {
        return toDoRepository.updateById(id, toDo);
    }

    /**
     * Marks a ToDo item as done by its ID.
     *
     * @param id the ID of the ToDo item to mark as done
     */
    public void markAsDoneById(Long id) {
        toDoRepository.markAsDoneById(id);
    }

    /**
     * Marks a ToDo item as undone by its ID.
     *
     * @param id the ID of the ToDo item to mark as undone
     */
    public void markUndoneById(Long id) {
        toDoRepository.markUndoneById(id);
    }
}
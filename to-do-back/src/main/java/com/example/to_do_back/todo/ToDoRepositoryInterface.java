package com.example.to_do_back.todo;

import java.util.Optional;

public interface ToDoRepositoryInterface {

    // Method to save a ToDo
    ToDo save(ToDo toDo);

    // Method to find a ToDo by its ID
    Optional<ToDo> findById(Long id);

    // Method to get a page of results
    Page findAll(int pageNum, String nameFilter, Integer priorityFilter, Boolean doneFilter, Boolean isPriorityAsc, Boolean isDueDateAsc);

    // Method to delete a ToDo by its ID
    void deleteById(Long id);

    // Method to update a ToDo by its ID
    Optional<ToDo> updateById(Long id, ToDo toDo);

    // Method to mark a ToDo as done by its ID
    void markAsDoneById(Long id);

    // Method to mark a ToDo as undone by its ID
    void markUndoneById(Long id);
}
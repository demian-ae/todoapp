package com.example.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.model.Page;
import com.example.todo.model.ToDo;
import com.example.todo.service.ToDoService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

/**
 * REST controller for managing ToDos.
 */
@RestController
@RequestMapping("/api/v1/todos")
@CrossOrigin(origins = "http://localhost:8080") // Allow requests from this origin
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    /**
     * Retrieves a paginated list of ToDo items based on various filters.
     *
     * @param page the page number to retrieve (default is 1)
     * @param text the text to filter ToDo items by (optional)
     * @param priority the priority level to filter ToDo items by (optional)
     * @param done the completion status to filter ToDo items by (optional)
     * @param isPriorityAsc whether to sort by priority in ascending order (optional)
     * @param isDueDateAsc whether to sort by due date in ascending order (optional)
     * @return a paginated list of ToDo items
     */
    @GetMapping
    public ResponseEntity<Page> getAllToDos(
        @RequestParam(defaultValue = "1") int page, 
        @RequestParam(required = false) String text,
        @RequestParam(required = false) Integer priority,
        @RequestParam(required = false) Boolean done,
        @RequestParam(required = false) Boolean isPriorityAsc,
        @RequestParam(required = false) Boolean isDueDateAsc
    ) {
        return ResponseEntity.ok(toDoService.getAllToDos(page, text, priority, done, isPriorityAsc, isDueDateAsc)); // 0-indexed
    }

    /**
     * Retrieves a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to retrieve
     * @return the ToDo item if found, or a 404 Not Found status
     */
    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getToDo(@PathVariable Long id) {
        Optional<ToDo> res = toDoService.getToDoById(id);
        if (res.isPresent()) {
            return ResponseEntity.ok(res.get());
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Creates a new ToDo item.
     *
     * @param toDo the ToDo item to create
     * @return the created ToDo item
     */
    @PostMapping
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo toDo) {
        ToDo res = toDoService.saveToDo(toDo);
        return ResponseEntity.ok(res);
    }

    /**
     * Deletes a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to delete
     * @return a 200 OK status
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToDo(@PathVariable Long id) {
        toDoService.deleteToDoById(id);
        return ResponseEntity.ok().build();
    }

    /**
     * Updates a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to update
     * @param toDo the updated ToDo item
     * @return the updated ToDo item if found, or a 404 Not Found status
     */
    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateById(@PathVariable Long id, @RequestBody ToDo toDo) {
        Optional<ToDo> res = toDoService.updateById(id, toDo);
        if (res.isPresent()) {
            return ResponseEntity.ok(res.get());
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Marks a ToDo item as done by its ID.
     *
     * @param id the ID of the ToDo item to mark as done
     * @return a 200 OK status
     */
    @PostMapping("/{id}/done")
    public ResponseEntity<Void> markAsDoneById(@PathVariable Long id) {
        toDoService.markAsDoneById(id);
        return ResponseEntity.ok().build();
    }

    /**
     * Marks a ToDo item as undone by its ID.
     *
     * @param id the ID of the ToDo item to mark as undone
     * @return a 200 OK status
     */
    @PutMapping("/{id}/undone")
    public ResponseEntity<Void> markUndoneById(@PathVariable Long id) {
        toDoService.markUndoneById(id);
        return ResponseEntity.ok().build();
    }
}
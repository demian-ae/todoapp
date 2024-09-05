package com.example.to_do_back.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/todos")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping
    public ResponseEntity<Collection<ToDo>> getAllToDos(){
        return ResponseEntity.ok(toDoService.getAllToDos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getToDo(@PathVariable Long id){
        Optional<ToDo> res = toDoService.getToDoById(id);
        if(res.isPresent()){
            return ResponseEntity.ok(res.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo toDo){
        ToDo res = toDoService.saveToDo(toDo);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToDo(@PathVariable Long id){
        toDoService.deleteToDoById(id);
        return ResponseEntity.ok().build();
    }
}

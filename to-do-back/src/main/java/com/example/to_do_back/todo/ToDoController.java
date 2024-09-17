package com.example.to_do_back.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Collection;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:8080") // Allow requests from this origin
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping
    public ResponseEntity<Page> getAllToDos(
        @RequestParam(defaultValue = "1") int page, 
        @RequestParam(required = false) String name,
        @RequestParam(required = false) Integer priority,
        @RequestParam(required = false) Boolean done
        ){

        return ResponseEntity.ok(toDoService.getAllToDos(page, name, priority, done)); // 0-indexed
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

    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateById(@PathVariable Long id, @RequestBody ToDo toDo) {
        Optional<ToDo> res = toDoService.updateById(id, toDo);
        if(res.isPresent()){
            return ResponseEntity.ok(res.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/done")
    public ResponseEntity<Void> markAsDoneById(@PathVariable Long id){
        toDoService.markAsDoneById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/undone")
    public ResponseEntity<Void> markUndoneById(@PathVariable Long id){
        toDoService.markUndoneById(id);
        return ResponseEntity.ok().build();
    }
}

package com.example.to_do_back.todo;

import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;



@Repository
public class ToDoRepository {
    private Map<Long, ToDo> todoMap = new HashMap<>();
    private long idCounter = 1; 

    public ToDo save(ToDo toDo){
        if(toDo.getId() == null){
            toDo.setId(idCounter++);
        }
        todoMap.put(toDo.getId(), toDo);
        return toDo;
    }

    public Optional<ToDo> findById(Long id){
        return Optional.of(todoMap.get(id));
    }

    public Collection<ToDo> findAll() {
        return todoMap.values();
    }

    public void deleteById(Long id){
        todoMap.remove(id);
    }

}

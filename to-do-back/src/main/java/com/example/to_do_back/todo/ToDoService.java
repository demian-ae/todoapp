package com.example.to_do_back.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;


@Service
public class ToDoService {
    @Autowired
    private ToDoRepository toDoRepository;

    public ToDo saveToDo(ToDo toDo){
        return toDoRepository.save(toDo);
    }

    public Optional<ToDo> getToDoById(Long id){
        return toDoRepository.findById(id);
    }

    public Collection<ToDo> getAllToDos(){
        return toDoRepository.findAll();
    }

    public void deleteToDoById(Long id){
        toDoRepository.deleteById(id);
    }

}

package com.example.to_do_back.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public Page getAllToDos(int page, String text, Integer priorityFilter, Boolean doneFilter, Boolean isPriorityAsc, Boolean isDueDateAsc){
        return toDoRepository.findAll(page, text, priorityFilter, doneFilter, isPriorityAsc, isDueDateAsc );
    }

    public void deleteToDoById(Long id){
        toDoRepository.deleteById(id);
    }

    public Optional<ToDo> updateById(Long id, ToDo toDo){
        return toDoRepository.updateById(id,toDo);
    }

    public void markAsDoneById(Long id){
        toDoRepository.markAsDoneById(id);
    }

    public void markUndoneById(Long id){
        toDoRepository.markUndoneById(id);
    }

}

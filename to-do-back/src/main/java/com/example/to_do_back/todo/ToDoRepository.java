package com.example.to_do_back.todo;

import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import java.time.LocalDateTime;



@Repository
public class ToDoRepository {
    private Map<Long, ToDo> todoMap = new HashMap<>();
    private long idCounter = 1;
    public static final int PAGE_SIZE = 10;

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

    private static <T> Collection<T> getPage(List<T> coll, int page, int size) {
        page = page - 1; // because 1-indexed. 
        if (page < 0 || size <= 0) { // validation
            throw new IllegalArgumentException("Número de página debe ser mayor o igual a 0 y tamaño de página debe ser mayor a 0");
        }

        int start = page * size;
        int end = Math.min(start + size, coll.size());

        if (start >= coll.size()) {
            return List.of();
        }

        return coll.subList(start, end);
    }

    public Page findAll(int page, String nameFilter, Integer priorityFilter, Boolean doneFilter) {
        Page pageRes = new Page();

        List<ToDo> res = new ArrayList<ToDo>(todoMap.values());

        // Aplicar filtros
        if (nameFilter != null && !nameFilter.isEmpty()) {
            res = res.stream()
                     .filter(todo -> todo.getText().toLowerCase().contains(nameFilter.toLowerCase()))
                     .collect(Collectors.toList());
        }

        if (priorityFilter != null) {
            res = res.stream()
                     .filter(todo -> todo.getPriority() == priorityFilter)
                     .collect(Collectors.toList());
        }

        if (doneFilter != null) {
            res = res.stream()
                     .filter(todo -> todo.isDone() == doneFilter)
                     .collect(Collectors.toList());
        }

        pageRes.setTotal((int)Math.ceil((double)res.size()/PAGE_SIZE));
        pageRes.setCurr(page);
        pageRes.setData(getPage(res,page,PAGE_SIZE));
        return pageRes;
    }

    public void deleteById(Long id){
        todoMap.remove(id);
    }

    public Optional<ToDo> updateById(Long id, ToDo toDo){
        Optional<ToDo> res = Optional.ofNullable(todoMap.get(id));
        if(res.isPresent()){
            ToDo curr = res.get();
            curr.setText(toDo.getText());
            curr.setDone(toDo.isDone());
            curr.setPriority(toDo.getPriority());
            if(toDo.isDone()){
                curr.setDoneDate(toDo.getDoneDate());
            }
            curr.setDoneDate(null);
            curr.setDueDate(toDo.getDueDate());
            curr.setCreationDate(toDo.getCreationDate());
            
            todoMap.put(curr.getId(), curr);
            return Optional.of(curr);
        }
        return res;
    }

    public void markAsDoneById(Long id){
        Optional<ToDo> res = Optional.ofNullable(todoMap.get(id));

        if(res.isPresent()){
            ToDo curr = res.get();
            if(!curr.isDone()){
                curr.setDoneDate(LocalDateTime.now());
                curr.setDone(true);
            }
            todoMap.put(curr.getId(), curr);
        } 
    }

    public void markUndoneById(Long id){
        Optional<ToDo> res = Optional.ofNullable(todoMap.get(id));

        if(res.isPresent()){
            ToDo curr = res.get();
            if(curr.isDone()){
                curr.setDoneDate(null);
                curr.setDone(false);
            }
            todoMap.put(curr.getId(), curr);
        } 
    }

}

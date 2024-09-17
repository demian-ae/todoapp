package com.example.to_do_back.todo;

import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.Duration;
import java.time.LocalDateTime;


@Repository
public class ToDoRepository implements ToDoRepositoryInterface{
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

    private static long calculateDifferenceInMinutes(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Both start and end LocalDateTime must be non-null");
        }
        
        // Calculate the duration between the two LocalDateTime instances
        Duration duration = Duration.between(start, end);
        
        // Get the difference in minutes
        return duration.toMinutes();
    }

    private static String formatMinutes(long minutes) {
        if (minutes < 0) {
            throw new IllegalArgumentException("Minutes cannot be negative");
        }
        // Calculate days, hours, and minutes
        long days = minutes / (24 * 60);
        long hours = (minutes % (24 * 60)) / 60;
        long remainingMinutes = minutes % 60;
        // Format the string based on whether there are days or not
        if (days > 0) {
            return String.format("%d days %02d:%02d", days, hours, remainingMinutes);
        } else {
            return String.format("%02d:%02d", hours, remainingMinutes);
        }
    }

    private class AvgTimesHelper {
        public String allAvgTime;
        public String lowAvgTime;
        public String mediumAvgTime;
        public String highAvgTime;

        public void calculateAvgTimes(List<ToDo> todos){
            long allDiffTimesSum = 0; int countAllDiffTimes = 0;
            long lowDiffTimesSum = 0; int countLowDiffTimes = 0;
            long mediumDiffTimesSum = 0; int countMediumDiffTimes = 0;
            long highDiffTimesSum = 0; int countHighDiffTimes = 0;
    
            for (Entry<Long, ToDo> todo : todoMap.entrySet()) {
                ToDo value = todo.getValue();
                if(value.isDone()) continue;
                if(value.getDueDate() == null) continue;
                long dif = calculateDifferenceInMinutes(value.getCreationDate(), value.getDueDate());
                if(value.getPriority()==1) {lowDiffTimesSum+=dif; countLowDiffTimes++;}
                if(value.getPriority()==2) {mediumDiffTimesSum+=dif; countMediumDiffTimes++;}
                if(value.getPriority()==3) {highDiffTimesSum+=dif; countHighDiffTimes++;}
                allDiffTimesSum+=dif; countAllDiffTimes++;
            }

            this.allAvgTime = formatMinutes(countAllDiffTimes!=0?(allDiffTimesSum/countAllDiffTimes):0);
            this.lowAvgTime = formatMinutes(countLowDiffTimes!=0?(lowDiffTimesSum/countLowDiffTimes):0);
            this.mediumAvgTime = formatMinutes(countMediumDiffTimes!=0?(mediumDiffTimesSum/countMediumDiffTimes):0);
            this.highAvgTime = formatMinutes(countHighDiffTimes!=0?(highDiffTimesSum/countHighDiffTimes):0);
        }
    }
    private static Map<Integer, List<ToDo>> groupToDosByPriority(List<ToDo> toDoList) {
        return toDoList.stream()
                       .collect(Collectors.groupingBy(ToDo::getPriority));
    }

    private List<ToDo> sortTodos(List<ToDo> todos, Boolean isPriorityAsc, Boolean isDueDateAsc){
        if(isPriorityAsc!=null){
            Comparator<ToDo> priorityComparator = Comparator.comparing(ToDo::getPriority);
            if(!isPriorityAsc) priorityComparator = Comparator.comparing(ToDo::getPriority).reversed();
            todos.sort(priorityComparator);
            // System.out.println("1");
            
            if(isDueDateAsc==null) return todos;

            System.out.println("asc");
            Comparator<ToDo> dueDateComparator = Comparator.comparing(ToDo::getDueDate);
            if(!isDueDateAsc) {
                dueDateComparator= Comparator.comparing(ToDo::getDueDate).reversed();
                // System.out.println("due date desc ");
            }

            Map<Integer, List<ToDo>> todosByPriority = groupToDosByPriority(todos);
            // System.out.println(todosByPriority);
            for(int i=1; i<todosByPriority.size(); i++){
                todosByPriority.get(i).sort(dueDateComparator);
            }


            todos.clear();
            if(isPriorityAsc){
                for(int i=1; i<=todosByPriority.size(); i++){
                    todos.addAll(todosByPriority.get(i));
                }
            }else{
                for(int i=todosByPriority.size(); i>=1; i--){
                    todos.addAll(todosByPriority.get(i));
                }
            }

            return todos;
        }

        if(isDueDateAsc!=null){
            Comparator<ToDo> dueDateComparator = Comparator.comparing(ToDo::getDueDate);
            if(!isDueDateAsc) {
                System.out.println("sodfds");
                dueDateComparator = Comparator.comparing(ToDo::getDueDate).reversed();
            }
            todos.sort(dueDateComparator);
        }

        return todos;
    }
    

    public Page findAll(int pageNum, String nameFilter, Integer priorityFilter, Boolean doneFilter, Boolean isPriorityAsc, Boolean isDueDateAsc) {
        // System.out.println("0");
        Page pageRes = new Page();

        List<ToDo> res = new ArrayList<ToDo>(todoMap.values());

        AvgTimesHelper avgTimes = new AvgTimesHelper();
        avgTimes.calculateAvgTimes(res);

        pageRes.setAllAvgTime(avgTimes.allAvgTime);
        pageRes.setLowAvgTime(avgTimes.lowAvgTime);
        pageRes.setMediumAvgTime(avgTimes.mediumAvgTime);
        pageRes.setHighAvgTime(avgTimes.highAvgTime);

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

        res = sortTodos(res, isPriorityAsc, isDueDateAsc);

        pageRes.setTotal((int)Math.ceil((double)res.size()/PAGE_SIZE));
        pageRes.setCurr(pageNum);
        pageRes.setData(getPage(res,pageNum,PAGE_SIZE));
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

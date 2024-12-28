package com.example.todo.repository;

import org.springframework.stereotype.Repository;

import com.example.todo.model.Page;
import com.example.todo.model.ToDo;
import com.example.todo.util.AvgTimesHelper;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Repository
public class ToDoLocalRepository implements ToDoRepository {
    private final Map<Long, ToDo> todoMap = new ConcurrentHashMap<>();
    private long idCounter = 1;
    public static final int PAGE_SIZE = 10;

    public synchronized ToDo save(ToDo toDo) {
        if (toDo.getId() == null) {
            toDo.setId(idCounter++);
        }
        todoMap.put(toDo.getId(), toDo);
        return toDo;
    }

    public Optional<ToDo> findById(Long id) {
        return Optional.ofNullable(todoMap.get(id));
    }

    public Page findAll(int pageNum, String nameFilter, Integer priorityFilter, Boolean doneFilter, Boolean isPriorityAsc, Boolean isDueDateAsc) {
        List<ToDo> res = new ArrayList<>(todoMap.values());

        AvgTimesHelper avgTimes = new AvgTimesHelper();
        avgTimes.calculateAvgTimes(res);

        Page pageRes = new Page();
        pageRes.setAllAvgTime(avgTimes.allAvgTime);
        pageRes.setLowAvgTime(avgTimes.lowAvgTime);
        pageRes.setMediumAvgTime(avgTimes.mediumAvgTime);
        pageRes.setHighAvgTime(avgTimes.highAvgTime);

        res = applyFilters(res, nameFilter, priorityFilter, doneFilter);
        res = sortTodos(res, isPriorityAsc, isDueDateAsc);

        pageRes.setTotal((int) Math.ceil((double) res.size() / PAGE_SIZE));
        pageRes.setCurr(pageNum);
        pageRes.setData(getPage(res, pageNum, PAGE_SIZE));
        return pageRes;
    }

    public void deleteById(Long id) {
        todoMap.remove(id);
    }

    public Optional<ToDo> updateById(Long id, ToDo toDo) {
        return Optional.ofNullable(todoMap.get(id)).map(curr -> {
            curr.setText(toDo.getText());
            curr.setDone(toDo.isDone());
            curr.setPriority(toDo.getPriority());
            curr.setDoneDate(toDo.isDone() ? toDo.getDoneDate() : null);
            curr.setDueDate(toDo.getDueDate());
            curr.setCreationDate(toDo.getCreationDate());
            todoMap.put(curr.getId(), curr);
            return curr;
        });
    }

    public void markAsDoneById(Long id) {
        todoMap.computeIfPresent(id, (key, curr) -> {
            if (!curr.isDone()) {
                curr.setDoneDate(LocalDateTime.now());
                curr.setDone(true);
            }
            return curr;
        });
    }

    public void markUndoneById(Long id) {
        todoMap.computeIfPresent(id, (key, curr) -> {
            if (curr.isDone()) {
                curr.setDoneDate(null);
                curr.setDone(false);
            }
            return curr;
        });
    }

    private static <T> Collection<T> getPage(List<T> coll, int page, int size) {
        page = page - 1;
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Page number must be >= 0 and page size must be > 0");
        }

        int start = page * size;
        int end = Math.min(start + size, coll.size());

        if (start >= coll.size()) {
            return List.of();
        }

        return coll.subList(start, end);
    }

    private List<ToDo> applyFilters(List<ToDo> todos, String nameFilter, Integer priorityFilter, Boolean doneFilter) {
        if (nameFilter != null && !nameFilter.isEmpty()) {
            todos = todos.stream()
                    .filter(todo -> todo.getText().toLowerCase().contains(nameFilter.toLowerCase()))
                    .collect(Collectors.toList());
        }

        if (priorityFilter != null) {
            todos = todos.stream()
                    .filter(todo -> todo.getPriority() == priorityFilter)
                    .collect(Collectors.toList());
        }

        if (doneFilter != null) {
            todos = todos.stream()
                    .filter(todo -> todo.isDone() == doneFilter)
                    .collect(Collectors.toList());
        }

        return todos;
    }

    private List<ToDo> sortTodos(List<ToDo> todos, Boolean isPriorityAsc, Boolean isDueDateAsc) {
        if (isPriorityAsc != null) {
            Comparator<ToDo> priorityComparator = Comparator.comparing(ToDo::getPriority);
            if (!isPriorityAsc) priorityComparator = priorityComparator.reversed();
            todos.sort(priorityComparator);

            if (isDueDateAsc != null) {
                Comparator<ToDo> dueDateComparator = Comparator.comparing(ToDo::getDueDate, Comparator.nullsLast(Comparator.naturalOrder()));
                if (!isDueDateAsc) dueDateComparator = dueDateComparator.reversed();

                Comparator<ToDo> dueDateComparatorFinal = dueDateComparator;
                Map<Integer, List<ToDo>> todosByPriority = groupToDosByPriority(todos);
                todos.clear();
                todosByPriority.forEach((priority, list) -> {
                    list.sort(dueDateComparatorFinal);
                    todos.addAll(list);
                });
            }
        } else if (isDueDateAsc != null) {
            Comparator<ToDo> dueDateComparator = Comparator.comparing(ToDo::getDueDate, Comparator.nullsLast(Comparator.naturalOrder()));
            if (!isDueDateAsc) dueDateComparator = dueDateComparator.reversed();
            todos.sort(dueDateComparator);
        }

        return todos;
    }

    private static Map<Integer, List<ToDo>> groupToDosByPriority(List<ToDo> toDoList) {
        return toDoList.stream()
                .collect(Collectors.groupingBy(ToDo::getPriority));
    }
}
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

/**
 * Local repository implementation for managing ToDo items.
 */
@Repository
public class ToDoLocalRepository implements ToDoRepository {
    private final Map<Long, ToDo> todoMap = new ConcurrentHashMap<>();
    private long idCounter = 1;
    public static final int PAGE_SIZE = 10;

    /**
     * Saves a ToDo item. If the item does not have an ID, a new ID is assigned.
     *
     * @param toDo the ToDo item to save
     * @return the saved ToDo item
     */
    public synchronized ToDo save(ToDo toDo) {
        if (toDo.getId() == null) {
            toDo.setId(idCounter++);
        }
        todoMap.put(toDo.getId(), toDo);
        return toDo;
    }

    /**
     * Finds a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to find
     * @return an Optional containing the ToDo item, or empty if not found
     */
    public Optional<ToDo> findById(Long id) {
        return Optional.ofNullable(todoMap.get(id));
    }

    /**
     * Retrieves a paginated list of ToDo items based on various filters.
     *
     * @param pageNum the page number to retrieve
     * @param nameFilter the text to filter ToDo items by. (optional)
     * @param priorityFilter the priority level to filter ToDo items by. (optional)
     * @param doneFilter the completion status to filter ToDo items by. (optional)
     * @param isPriorityAsc whether to sort by priority in ascending order. If null, no sorting is applied.
     * @param isDueDateAsc whether to sort by due date in ascending order. If null, no sorting is applied.
     * @return a paginated list of ToDo items
     */
    public Page findAll(int pageNum, String nameFilter, Integer priorityFilter, Boolean doneFilter, Boolean isPriorityAsc, Boolean isDueDateAsc) {
        List<ToDo> res = new ArrayList<>(todoMap.values());

        AvgTimesHelper avgTimes = new AvgTimesHelper(res);

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

    /**
     * Deletes a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to delete
     */
    public void deleteById(Long id) {
        todoMap.remove(id);
    }

    /**
     * Updates a ToDo item by its ID.
     *
     * @param id the ID of the ToDo item to update
     * @param toDo the updated ToDo item
     * @return an Optional containing the updated ToDo item, or empty if not found
     */
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

    /**
     * Marks a ToDo item as done by its ID.
     *
     * @param id the ID of the ToDo item to mark as done
     */
    public void markAsDoneById(Long id) {
        todoMap.computeIfPresent(id, (key, curr) -> {
            if (!curr.isDone()) {
                curr.setDoneDate(LocalDateTime.now());
                curr.setDone(true);
            }
            return curr;
        });
    }

    /**
     * Marks a ToDo item as undone by its ID.
     *
     * @param id the ID of the ToDo item to mark as undone
     */
    public void markUndoneById(Long id) {
        todoMap.computeIfPresent(id, (key, curr) -> {
            if (curr.isDone()) {
                curr.setDoneDate(null);
                curr.setDone(false);
            }
            return curr;
        });
    }

    /**
     * Retrieves a sublist of a collection based on the page number and page size.
     *
     * @param coll the collection to paginate
     * @param page the page number to retrieve
     * @param size the size of each page
     * @return a sublist of the collection representing the requested page
     */
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

    /**
     * Applies filters to a list of ToDo items.
     *
     * @param todos the list of ToDo items to filter
     * @param nameFilter the text to filter ToDo items by
     * @param priorityFilter the priority level to filter ToDo items by
     * @param doneFilter the completion status to filter ToDo items by
     * @return the filtered list of ToDo items
     */
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

    /**
     * Sorts a list of ToDo items based on priority and due date.
     *
     * @param todos the list of ToDo items to sort
     * @param isPriorityAsc whether to sort by priority in ascending order
     * @param isDueDateAsc whether to sort by due date in ascending order
     * @return the sorted list of ToDo items
     */
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

    /**
     * Groups a list of ToDo items by their priority.
     *
     * @param toDoList the list of ToDo items to group
     * @return a map where the keys are priority levels and the values are lists of ToDo items with that priority
     */
    private static Map<Integer, List<ToDo>> groupToDosByPriority(List<ToDo> toDoList) {
        return toDoList.stream()
                .collect(Collectors.groupingBy(ToDo::getPriority));
    }
}
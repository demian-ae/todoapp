package com.example.to_do_back.todo;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.util.Comparator;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class ToDoUtils {

    public static void sortByPriority(ArrayList<ToDo> todos) {
        todos.sort(Comparator.comparingInt(ToDo::getPriority));
    }

    public static void sortByDueDate(ArrayList<ToDo> todos) {
        todos.sort(Comparator.comparing(ToDo::getDueDate));
    }

    public static void sortByPriorityAndDueDate(ArrayList<ToDo> todos) {
        todos.sort(Comparator.comparing(ToDo::getPriority)
                           .thenComparing(ToDo::getDueDate));
    }

    public static List<ToDo> filterByDone(ArrayList<ToDo> todos, boolean done) {
        return todos.stream()
                    .filter(todo -> todo.isDone() == done)
                    .collect(Collectors.toList());
    }

    public static List<ToDo> filterByName(ArrayList<ToDo> todos, String partOfName) {
        return todos.stream()
                    .filter(todo -> todo.getText().toLowerCase().contains(partOfName.toLowerCase()))
                    .collect(Collectors.toList());
    }

    public static List<ToDo> filterByPriority(ArrayList<ToDo> todos, int priority) {
        return todos.stream()
                    .filter(todo -> todo.getPriority() == priority)
                    .collect(Collectors.toList());
    }
}

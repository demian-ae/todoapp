package com.example.to_do_back.todo;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ToDo {
    private Long id;
    private String text;
    private boolean done;
    private Integer priority;
    private LocalDate doneDate;
    private LocalDate dueDate;
    private LocalDate creationDate;
}

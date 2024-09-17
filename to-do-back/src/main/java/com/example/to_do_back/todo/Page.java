package com.example.to_do_back.todo;

import java.util.Collection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Page {
    private int curr;
    private int total;
    private Collection<ToDo> data; 

    
}

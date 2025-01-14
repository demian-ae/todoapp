package com.example.todo.service;

import com.example.todo.model.Page;
import com.example.todo.model.ToDo;
import com.example.todo.repository.ToDoLocalRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class ToDoServiceTest {

    @Autowired
    private ToDoService toDoService;

    @MockBean
    private ToDoLocalRepository toDoRepository;

    @Test
    public void testSaveToDo() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setText("Test ToDo");
        when(toDoRepository.save(any(ToDo.class))).thenReturn(toDo);

        // Act
        ToDo result = toDoService.saveToDo(toDo);

        // Assert
        assertThat(result.getText()).isEqualTo("Test ToDo");
        verify(toDoRepository, times(1)).save(toDo);
    }

    @Test
    public void testGetToDoById() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setId(1L);
        when(toDoRepository.findById(1L)).thenReturn(Optional.of(toDo));

        // Act
        Optional<ToDo> result = toDoService.getToDoById(1L);

        // Assert
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(1L);
        verify(toDoRepository, times(1)).findById(1L);
    }

    @Test
    public void testGetAllToDos() {
        // Arrange
        Page page = new Page();
        when(toDoRepository.findAll(anyInt(), anyString(), any(), any(), anyBoolean(), anyBoolean())).thenReturn(page);

        // Act
        Page result = toDoService.getAllToDos(0, "test", null, null, true, true);

        // Assert
        assertThat(result).isNotNull();
        verify(toDoRepository, times(1)).findAll(0, "test", null, null, true, true);
    }

    @Test
    public void testDeleteToDoById() {
        // Act
        toDoService.deleteToDoById(1L);

        // Assert
        verify(toDoRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testUpdateById() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setId(1L);
        when(toDoRepository.updateById(1L, toDo)).thenReturn(Optional.of(toDo));

        // Act
        Optional<ToDo> result = toDoService.updateById(1L, toDo);

        // Assert
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(1L);
        verify(toDoRepository, times(1)).updateById(1L, toDo);
    }

    @Test
    public void testMarkAsDoneById() {
        // Act
        toDoService.markAsDoneById(1L);

        // Assert
        verify(toDoRepository, times(1)).markAsDoneById(1L);
    }

    @Test
    public void testMarkUndoneById() {
        // Act
        toDoService.markUndoneById(1L);

        // Assert
        verify(toDoRepository, times(1)).markUndoneById(1L);
    }
}
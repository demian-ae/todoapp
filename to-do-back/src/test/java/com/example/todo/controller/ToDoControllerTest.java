package com.example.todo.controller;

import com.example.todo.model.Page;
import com.example.todo.model.ToDo;
import com.example.todo.service.ToDoService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

public class ToDoControllerTest {

    @Mock
    private ToDoService toDoService;

    @InjectMocks
    private ToDoController toDoController;

    public ToDoControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllToDos() {
        // Arrange
        Page page = new Page();
        when(toDoService.getAllToDos(anyInt(), anyString(), any(), any(), anyBoolean(), anyBoolean())).thenReturn(page);

        // Act
        ResponseEntity<Page> response = toDoController.getAllToDos(1, "test", null, null, true, true);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(page);
        verify(toDoService, times(1)).getAllToDos(1, "test", null, null, true, true);
    }

    @Test
    public void testGetToDo() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setId(1L);
        when(toDoService.getToDoById(1L)).thenReturn(Optional.of(toDo));

        // Act
        ResponseEntity<ToDo> response = toDoController.getToDo(1L);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(toDo);
        verify(toDoService, times(1)).getToDoById(1L);
    }

    @Test
    public void testGetToDo_NotFound() {
        // Arrange
        when(toDoService.getToDoById(1L)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<ToDo> response = toDoController.getToDo(1L);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(404);
        verify(toDoService, times(1)).getToDoById(1L);
    }

    @Test
    public void testCreateToDo() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setText("Test ToDo");
        when(toDoService.saveToDo(any(ToDo.class))).thenReturn(toDo);

        // Act
        ResponseEntity<ToDo> response = toDoController.createToDo(toDo);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(toDo);
        verify(toDoService, times(1)).saveToDo(toDo);
    }

    @Test
    public void testDeleteToDo() {
        // Act
        ResponseEntity<Void> response = toDoController.deleteToDo(1L);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        verify(toDoService, times(1)).deleteToDoById(1L);
    }

    @Test
    public void testUpdateById() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setId(1L);
        when(toDoService.updateById(1L, toDo)).thenReturn(Optional.of(toDo));

        // Act
        ResponseEntity<ToDo> response = toDoController.updateById(1L, toDo);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(toDo);
        verify(toDoService, times(1)).updateById(1L, toDo);
    }

    @Test
    public void testUpdateById_NotFound() {
        // Arrange
        ToDo toDo = new ToDo();
        when(toDoService.updateById(1L, toDo)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<ToDo> response = toDoController.updateById(1L, toDo);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(404);
        verify(toDoService, times(1)).updateById(1L, toDo);
    }

    @Test
    public void testMarkAsDoneById() {
        // Act
        ResponseEntity<Void> response = toDoController.markAsDoneById(1L);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        verify(toDoService, times(1)).markAsDoneById(1L);
    }

    @Test
    public void testMarkUndoneById() {
        // Act
        ResponseEntity<Void> response = toDoController.markUndoneById(1L);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        verify(toDoService, times(1)).markUndoneById(1L);
    }
}
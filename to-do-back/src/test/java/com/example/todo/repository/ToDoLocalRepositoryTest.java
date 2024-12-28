package com.example.todo.repository;

import com.example.todo.model.Page;
import com.example.todo.model.ToDo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

public class ToDoLocalRepositoryTest {

    private ToDoLocalRepository toDoLocalRepository;

    @BeforeEach
    public void setUp() {
        toDoLocalRepository = new ToDoLocalRepository();
    }

    @Test
    public void testSaveToDo() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setText("Test ToDo");

        // Act
        ToDo savedToDo = toDoLocalRepository.save(toDo);

        // Assert
        assertThat(savedToDo.getId()).isNotNull();
        assertThat(savedToDo.getText()).isEqualTo("Test ToDo");
    }

    @Test
    public void testFindById() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setText("Test ToDo");
        ToDo savedToDo = toDoLocalRepository.save(toDo);

        // Act
        Optional<ToDo> foundToDo = toDoLocalRepository.findById(savedToDo.getId());

        // Assert
        assertThat(foundToDo).isPresent();
        assertThat(foundToDo.get().getText()).isEqualTo("Test ToDo");
    }

    @Test
    public void testFindById_NotFound() {
        // Act
        Optional<ToDo> foundToDo = toDoLocalRepository.findById(1L);

        // Assert
        assertThat(foundToDo).isNotPresent();
    }

    @Test
    public void testDeleteById() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setText("Test ToDo");
        ToDo savedToDo = toDoLocalRepository.save(toDo);

        // Act
        toDoLocalRepository.deleteById(savedToDo.getId());
        Optional<ToDo> foundToDo = toDoLocalRepository.findById(savedToDo.getId());

        // Assert
        assertThat(foundToDo).isNotPresent();
    }

    @Test
    public void testUpdateById() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setText("Test ToDo");
        ToDo savedToDo = toDoLocalRepository.save(toDo);

        ToDo updatedToDo = new ToDo();
        updatedToDo.setText("Updated ToDo");
        updatedToDo.setDone(true);

        // Act
        Optional<ToDo> result = toDoLocalRepository.updateById(savedToDo.getId(), updatedToDo);

        // Assert
        assertThat(result).isPresent();
        assertThat(result.get().getText()).isEqualTo("Updated ToDo");
        assertThat(result.get().isDone()).isTrue();
    }

    @Test
    public void testMarkAsDoneById() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setText("Test ToDo");
        ToDo savedToDo = toDoLocalRepository.save(toDo);

        // Act
        toDoLocalRepository.markAsDoneById(savedToDo.getId());
        Optional<ToDo> foundToDo = toDoLocalRepository.findById(savedToDo.getId());

        // Assert
        assertThat(foundToDo).isPresent();
        assertThat(foundToDo.get().isDone()).isTrue();
        assertThat(foundToDo.get().getDoneDate()).isNotNull();
    }

    @Test
    public void testMarkUndoneById() {
        // Arrange
        ToDo toDo = new ToDo();
        toDo.setText("Test ToDo");
        toDo.setDone(true);
        toDo.setDoneDate(LocalDateTime.now());
        ToDo savedToDo = toDoLocalRepository.save(toDo);

        // Act
        toDoLocalRepository.markUndoneById(savedToDo.getId());
        Optional<ToDo> foundToDo = toDoLocalRepository.findById(savedToDo.getId());

        // Assert
        assertThat(foundToDo).isPresent();
        assertThat(foundToDo.get().isDone()).isFalse();
        assertThat(foundToDo.get().getDoneDate()).isNull();
    }

    @Test
    public void testFindAll() {
        // Arrange
        ToDo toDo1 = new ToDo();
        toDo1.setText("Test ToDo 1");
        toDoLocalRepository.save(toDo1);

        ToDo toDo2 = new ToDo();
        toDo2.setText("Test ToDo 2");
        toDoLocalRepository.save(toDo2);

        // Act
        Page page = toDoLocalRepository.findAll(1, null, null, null, null, null);

        // Assert
        assertThat(page.getData()).hasSize(2);
        assertThat(page.getData()).extracting("text").containsExactlyInAnyOrder("Test ToDo 1", "Test ToDo 2");
    }
}
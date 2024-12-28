package com.example.todo.util;

import com.example.todo.model.ToDo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

public class AvgTimesHelperTest {

    private AvgTimesHelper avgTimesHelper;

    @BeforeEach
    public void setUp() {
        avgTimesHelper = new AvgTimesHelper();
    }

    @Test
    public void testCalculateAvgTimes_AllPriorities() {
        // Arrange
        List<ToDo> todos = new ArrayList<>();
        todos.add(createToDo(1, LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(1)));
        todos.add(createToDo(2, LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(1)));
        todos.add(createToDo(3, LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(1)));

        /*
         * total avg time = (2 + 2 + 2) / 3 = 2
         * low avg time = 2
         * medium avg time = 2
         * high avg time = 2
         */

        // Act
        avgTimesHelper.calculateAvgTimes(todos);

        // Assert
        assertThat(avgTimesHelper.allAvgTime).isEqualTo("2 days 00:00");
        assertThat(avgTimesHelper.lowAvgTime).isEqualTo("2 days 00:00");
        assertThat(avgTimesHelper.mediumAvgTime).isEqualTo("2 days 00:00");
        assertThat(avgTimesHelper.highAvgTime).isEqualTo("2 days 00:00");
    }

    @Test
    public void testCalculateAvgTimes_EmptyList() {
        // Arrange
        List<ToDo> todos = new ArrayList<>();

        // Act
        avgTimesHelper.calculateAvgTimes(todos);

        // Assert
        assertThat(avgTimesHelper.allAvgTime).isEqualTo("00:00");
        assertThat(avgTimesHelper.lowAvgTime).isEqualTo("00:00");
        assertThat(avgTimesHelper.mediumAvgTime).isEqualTo("00:00");
        assertThat(avgTimesHelper.highAvgTime).isEqualTo("00:00");
    }

    @Test
    public void testCalculateAvgTimes_SomeDone() {
        // Arrange
        List<ToDo> todos = new ArrayList<>();
        todos.add(createToDo(1, LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(1)));
        ToDo doneToDo = createToDo(2, LocalDateTime.now().minusDays(2), LocalDateTime.now().plusDays(2));
        doneToDo.setDone(true);
        todos.add(doneToDo);

        // Act
        avgTimesHelper.calculateAvgTimes(todos);

        // Assert
        assertThat(avgTimesHelper.allAvgTime).isEqualTo("2 days 00:00");
        assertThat(avgTimesHelper.lowAvgTime).isEqualTo("2 days 00:00");
        assertThat(avgTimesHelper.mediumAvgTime).isEqualTo("00:00");
        assertThat(avgTimesHelper.highAvgTime).isEqualTo("00:00");
    }

    @Test
    public void testCalculateAvgTimes_NoDueDate() {
        // Arrange
        List<ToDo> todos = new ArrayList<>();
        ToDo toDo = createToDo(1, LocalDateTime.now().minusDays(1), null);
        todos.add(toDo);

        // Act
        avgTimesHelper.calculateAvgTimes(todos);

        // Assert
        assertThat(avgTimesHelper.allAvgTime).isEqualTo("00:00");
        assertThat(avgTimesHelper.lowAvgTime).isEqualTo("00:00");
        assertThat(avgTimesHelper.mediumAvgTime).isEqualTo("00:00");
        assertThat(avgTimesHelper.highAvgTime).isEqualTo("00:00");
    }

    private ToDo createToDo(int priority, LocalDateTime creationDate, LocalDateTime dueDate) {
        ToDo toDo = new ToDo();
        toDo.setPriority(priority);
        toDo.setCreationDate(creationDate);
        toDo.setDueDate(dueDate);
        return toDo;
    }
}
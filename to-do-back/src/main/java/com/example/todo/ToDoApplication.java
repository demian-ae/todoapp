package com.example.todo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.todo.model.ToDo;
import com.example.todo.repository.ToDoLocalRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

/**
 * Main application class for the ToDo application.
 */
@SpringBootApplication
public class ToDoApplication {

    /**
     * Main method to run the Spring Boot application.
     *
     * @param args command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(ToDoApplication.class, args);
    }

    /**
     * Bean to populate the repository with demo data.
     *
     * @param toDoRepository the repository to populate
     * @return a CommandLineRunner to run the demo data population
     */
    @Bean
    public CommandLineRunner demo(ToDoLocalRepository toDoRepository) {
        return (args) -> {
            List<String> tasks = Arrays.asList(
                "Random task 1", "Random task 2", "Random task 3", "Random task 4", "Random task 5",
                "Random task 6", "Random task 7", "Random task 8", "Random task 9", "Random task 10"
            );

            Random random = new Random();

            // Populate the repository with demo data
            IntStream.range(0, tasks.size()).forEach(i -> {
                String taskDescription = tasks.get(i);
                boolean done = random.nextBoolean();
                int priority = random.nextInt(3) + 1; // priority 1-3

                LocalDateTime now = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
                LocalDateTime doneDate = done ? now : null;
                LocalDateTime dueDate = now.plusDays(random.nextInt(3)).plusHours(random.nextInt(10));
                LocalDateTime creationDate = now;

                ToDo toDo = new ToDo(
                    null, // automatic ID 
                    taskDescription,
                    done,
                    priority,
                    doneDate,
                    dueDate,
                    creationDate
                );
                
                toDoRepository.save(toDo);
            });
        };
    }
}
package com.example.to_do_back;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.to_do_back.todo.ToDo;
import com.example.to_do_back.todo.ToDoRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@SpringBootApplication
public class ToDoBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoBackApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(ToDoRepository toDoRepository) {
        return (args) -> {
            // List<String> tasks = Arrays.asList(
            //     "Random task 1", "Random task 2", "Random task 3", "Random task 4", "Random task 5",
            //     "Random task 6", "Random task 7", "Random task 8", "Random task 9", "Random task 10",
            //     "Random task 11", "Random task 12", "Random task 13", "Random task 14", "Random task 15",
            //     "Random task 16", "Random task 17", "Random task 18", "Random task 19", "Random task 20"
            // );

            List<String> tasks = Arrays.asList(
                "Random task 1", "Random task 2", "Random task 3", "Random task 4", "Random task 5",
                "Random task 6", "Random task 7", "Random task 8", "Random task 9", "Random task 10"
            );

            Random random = new Random();

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

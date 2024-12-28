package com.example.todo.util;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import com.example.todo.model.ToDo;

public class AvgTimesHelper {
    public String allAvgTime;
    public String lowAvgTime;
    public String mediumAvgTime;
    public String highAvgTime;

    public void calculateAvgTimes(List<ToDo> todos){
        long allDiffTimesSum = 0; int countAllDiffTimes = 0;
        long lowDiffTimesSum = 0; int countLowDiffTimes = 0;
        long mediumDiffTimesSum = 0; int countMediumDiffTimes = 0;
        long highDiffTimesSum = 0; int countHighDiffTimes = 0;

        for (ToDo todo : todos) {
            if(todo.isDone()) continue;
            if(todo.getDueDate() == null) continue;
            long dif = calculateDifferenceInMinutes(todo.getCreationDate(), todo.getDueDate());
            if(todo.getPriority()==1) {lowDiffTimesSum+=dif; countLowDiffTimes++;}
            if(todo.getPriority()==2) {mediumDiffTimesSum+=dif; countMediumDiffTimes++;}
            if(todo.getPriority()==3) {highDiffTimesSum+=dif; countHighDiffTimes++;}
            allDiffTimesSum+=dif; countAllDiffTimes++;
        }

        this.allAvgTime = formatMinutes(countAllDiffTimes!=0?(allDiffTimesSum/countAllDiffTimes):0);
        this.lowAvgTime = formatMinutes(countLowDiffTimes!=0?(lowDiffTimesSum/countLowDiffTimes):0);
        this.mediumAvgTime = formatMinutes(countMediumDiffTimes!=0?(mediumDiffTimesSum/countMediumDiffTimes):0);
        this.highAvgTime = formatMinutes(countHighDiffTimes!=0?(highDiffTimesSum/countHighDiffTimes):0);
    }

    private static long calculateDifferenceInMinutes(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Both start and end LocalDateTime must be non-null");
        }
        
        // Calculate the duration between the two LocalDateTime instances
        Duration duration = Duration.between(start, end);
        
        // Get the difference in minutes
        return duration.toMinutes();
    }

    private static String formatMinutes(long minutes) {
        if (minutes < 0) {
            throw new IllegalArgumentException("Minutes cannot be negative");
        }
        // Calculate days, hours, and minutes
        long days = minutes / (24 * 60);
        long hours = (minutes % (24 * 60)) / 60;
        long remainingMinutes = minutes % 60;
        // Format the string based on whether there are days or not
        if (days > 0) {
            return String.format("%d days %02d:%02d", days, hours, remainingMinutes);
        } else {
            return String.format("%02d:%02d", hours, remainingMinutes);
        }
    }
}
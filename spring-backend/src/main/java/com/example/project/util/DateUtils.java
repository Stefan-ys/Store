package com.example.project.util;


import lombok.experimental.UtilityClass;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@UtilityClass
public class DateUtils {

    public static String formatLocalDateTime(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy  HH:mm", Locale.ENGLISH);
        return localDateTime.format(formatter);
    }

    public static String getTimeBetween(LocalDateTime dateStart, LocalDateTime dateEnd) {
        Duration duration = Duration.between(dateStart, dateEnd);

        long years = duration.toDays() / 365;
        long months = (duration.toDays() % 365) / 30;
        long days = duration.toDays() % 30;
        long hours = duration.toHours() % 24;
        long minutes = duration.toMinutes() % 60;

        StringBuilder result = new StringBuilder();

        if (years > 0) {
            result.append(years).append(" year").append(years > 1 ? "s" : "").append(" ");
        }
        if (months > 0) {
            result.append(months).append(" month").append(months > 1 ? "s" : "").append(" ");
        }
        if (days > 0) {
            result.append(days).append(" day").append(days > 1 ? "s" : "").append(" ");
        }
        if (hours > 0) {
            result.append(hours).append(" hour").append(hours > 1 ? "s" : "").append(" ");
        }
        if (minutes > 0) {
            result.append(minutes).append(" minute").append(minutes > 1 ? "s" : "");
        }

        return result.toString().trim();
    }
}



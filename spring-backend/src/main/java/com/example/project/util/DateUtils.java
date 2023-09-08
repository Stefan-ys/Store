package com.example.project.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

public class DateUtils {

    public static String formatLocalDateTime(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy  HH:mm", Locale.ENGLISH);
        return localDateTime.format(formatter);
    }

    public static String getTimeBetween(LocalDateTime dateStart, LocalDateTime dateEnd) {

        long days = ChronoUnit.DAYS.between(dateStart, dateEnd);
        if (days < 1) {
            long hours = ChronoUnit.HOURS.between(dateStart, dateEnd);
            if (hours < 1) {
                long minutes = ChronoUnit.MINUTES.between(dateStart, dateEnd);
                return (minutes == 1) ? minutes + " minute" : minutes + " minutes";
            } else {
                return (hours == 1) ? hours + " hour" : hours + " hours";
            }
        } else if (days > 30) {
            long years = ChronoUnit.YEARS.between(dateStart, dateEnd);
            return (years == 1) ? years + " year" : years + " years";
        } else {
            return (days == 1) ? days + " day" : days + " days";
        }
    }
}



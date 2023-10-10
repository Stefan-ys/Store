package com.example.project.service;

import com.example.project.payload.request.NotificationRequest;
import com.example.project.payload.response.NotificationResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface NotificationService {

    // Create

    void sendNotification(NotificationRequest notificationRequest, List<String> users);

    // Retrieve
    List<NotificationResponse> getMyAllNotifications(ObjectId userId);
    List<NotificationResponse> getMyUncheckedNotifications(ObjectId userId);
    List<NotificationResponse> getMyCheckedNotifications(ObjectId userId);


    // Update

    void editNotification(ObjectId notificationId, NotificationRequest notificationRequest);

    // Delete

    void deleteNotification(ObjectId notificationId);
}

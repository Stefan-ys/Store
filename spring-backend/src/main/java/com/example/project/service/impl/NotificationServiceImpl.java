package com.example.project.service.impl;

import com.example.project.payload.request.NotificationRequest;
import com.example.project.payload.response.NotificationResponse;
import com.example.project.repository.NotificationRepository;
import com.example.project.service.NotificationService;
import lombok.Data;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final ModelMapper modelMapper;

    // Create

    @Override
    public void sendNotification(NotificationRequest notificationRequest, List<String> users) {

    }

    // Retrieve
    @Override
    public List<NotificationResponse> getMyAllNotifications(ObjectId userId) {

        return null;
    }

    @Override
    public List<NotificationResponse> getMyUncheckedNotifications(ObjectId userId) {
        return null;
    }

    @Override
    public List<NotificationResponse> getMyCheckedNotifications(ObjectId userId) {
        return null;
    }

    // Update

    @Override
    public void editNotification(ObjectId notificationId, NotificationRequest notificationRequest) {

    }

    // Delete

    @Override
    public void deleteNotification(ObjectId notificationId) {

    }

    // Helpers
}

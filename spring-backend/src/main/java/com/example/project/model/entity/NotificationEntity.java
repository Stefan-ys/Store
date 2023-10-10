package com.example.project.model.entity;

import com.example.project.model.enums.NotificationCategoryEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "notifications")
@Data
public class NotificationEntity extends BaseEntity {
    private List<ObjectId> recipients;
    private NotificationCategoryEnum notificationCategory;
    private String header;
    private String message;

}

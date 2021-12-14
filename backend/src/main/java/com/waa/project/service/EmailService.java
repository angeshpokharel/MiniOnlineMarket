package com.waa.project.service;

import com.waa.project.domain.Orders;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);
}

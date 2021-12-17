package com.waa.project.service;

public interface GeneralService {
    Boolean checkProductUsing(long id);
    long getAvailablePointsByUserId(long userId);
}

package com.waa.project.domain;

public enum OrderStatus {
    NEW("NEW"),
    REJECTED("REJECTED"),
    SHIPPED("SHIPPED"),
    DELIVERED("DELIVERED");

    private String orderStatus;

    OrderStatus(String orderStatus){
        this.orderStatus = orderStatus;
    }

    public String getOrderStatus() {
        return orderStatus;
    }
}

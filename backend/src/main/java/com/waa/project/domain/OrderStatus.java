package com.waa.project.domain;

public enum OrderStatus {
    NEW("new"),
    REJECTED("rejected"),
    SHIPPED("shipped"),
    DELIVERED("delivered");

    private String orderStatus;

    OrderStatus(String orderStatus){
        this.orderStatus = orderStatus;
    }

    public String getOrderStatus() {
        return orderStatus;
    }
}

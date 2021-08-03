package com.hsiangyu.model;

import java.io.Serializable;

public class UdaUnit implements Serializable {
    private static final long serialVersionUID = 1L;
    private int id = 0;
    private String udaValue = "";

    public UdaUnit() {
        super();
    }

    public UdaUnit(int id, String udaValue) {
        super();
        this.id = id;
        this.udaValue = udaValue;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUdaValue() {
        return udaValue;
    }

    public void setUdaValue(String udaValue) {
        this.udaValue = udaValue;
    }
}
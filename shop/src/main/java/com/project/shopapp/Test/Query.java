package com.project.shopapp.Test;


import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class Query {

    @XmlAttribute(name = "id")
    private String id;

    @XmlAttribute(name = "useConfig")
    private String useConfig;

    @XmlElement(name = "sql")
    private String sql;

    @XmlElement(name = "result")
    private Result result;

    // Các phương thức getter và setter

    // Constructors
}
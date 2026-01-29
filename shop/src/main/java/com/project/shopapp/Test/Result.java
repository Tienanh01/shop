package com.project.shopapp.Test;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlValue;

@XmlAccessorType(XmlAccessType.FIELD)
public class Result {

    @XmlAttribute(name = "outputType")
    private String outputType;

    @XmlValue
    private String value;

    // Các phương thức getter và setter

    // Constructors
}
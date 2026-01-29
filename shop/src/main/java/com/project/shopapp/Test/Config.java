package com.project.shopapp.Test;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlElement;


import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
public class Config {

    @XmlAttribute(name = "id")
    private String id;

    @XmlElement(name = "property")
    private List<Property> properties;

    // Các phương thức getter và setter

    // Constructors
}

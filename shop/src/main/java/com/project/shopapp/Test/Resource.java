package com.project.shopapp.Test;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class Resource {

    @XmlAttribute(name = "method")
    private String method;

    @XmlAttribute(name = "path")
    private String path;

    @XmlElement(name = "description")
    private String description;

    @XmlElement(name = "call-query")
    private CallQuery callQuery;

    // Các phương thức getter và setter

    // Constructors
}
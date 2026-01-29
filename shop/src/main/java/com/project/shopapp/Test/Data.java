package com.project.shopapp.Test;


import jakarta.xml.bind.annotation.*;

import java.util.List;

@XmlRootElement(name = "data")
@lombok.Data
@XmlAccessorType(XmlAccessType.FIELD)
public class Data {

    @XmlAttribute(name = "name")
    private String name;

    @XmlAttribute(name = "serviceStatus")
    private String serviceStatus;

    @XmlAttribute(name = "serviceNamespace")
    private String serviceNamespace;

    @XmlAttribute(name = "serviceGroup")
    private String serviceGroup;

    @XmlAttribute(name = "transports")
    private String transports;

    @XmlElement(name = "description")
    private String description;

    @XmlElement(name = "config")
    private List<Config> configs;

    @XmlElement(name = "resource")
    private Resource resource;

    // Các phương thức getter và setter

    // Constructors
}

package com.project.shopapp.Test;


import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Marshaller;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

public class ObjectToXml {
    public static void main(String[] args) throws Exception {
        Data data = new Data();

        JAXBContext contextObj = JAXBContext.newInstance(Data.class);

        Marshaller marshallerObj = contextObj.createMarshaller();
        marshallerObj.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);



        // Write data to console
//        marshallerObj.marshal(dept, System.out);
//
//        // Write data to file xml
//        marshallerObj.marshal(dept, new FileOutputStream("department.xml"));
    }

    private static Department getDepartment() {
        // Create employees
        List<Employee> employees = new ArrayList<>();
        Employee emp1 = new Employee(1, "GP Coder", 1000, 28);
        Employee emp2 = new Employee(2, "LN Devil", 700, 27);
        employees.add(emp1);
        employees.add(emp2);

        // Create department
        Department department = new Department("D01", "IT Support");
        department.setEmployees(employees);
        return department;
    }

}

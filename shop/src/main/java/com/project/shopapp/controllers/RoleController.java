package com.project.shopapp.controllers;

import com.project.shopapp.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;
    @GetMapping("/getlist")
    public Object getListRoles() {

        return roleService.getListRoles();
    }
}

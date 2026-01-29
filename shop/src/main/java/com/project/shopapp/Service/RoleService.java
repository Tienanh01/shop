package com.project.shopapp.Service;

import com.project.shopapp.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements IRoleService{
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public Object getListRoles() {

        return roleRepository.findAll();
    }
}

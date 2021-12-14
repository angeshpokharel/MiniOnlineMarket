package com.waa.project.controller;

import com.waa.project.dto.CartDTO;
import com.waa.project.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/general")
public class GeneralController {
    @Autowired
    GeneralService generalService;

    @GetMapping("/checkProductUsing/{id}")
    public Boolean checkProductUsing(@PathVariable("id") long id){
        return generalService.checkProductUsing(id);
    }
}

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


    //this api will be used before product deletion
    //checking if a product is used in shopping cart details and order details - win
    @GetMapping("/checkProductUsing/{id}")
    public Boolean checkProductUsing(@PathVariable("id") long id){
        return generalService.checkProductUsing(id);
    }

    //this api will be used at purchasing at order
    //getting sum of all points of a user
    //will be given userId - win
    @GetMapping("/getPoints/{userId}")
    public long getPointsByUserId(@PathVariable("userId") long userId){
        return generalService.getPointsByUserId(userId);
    }
}

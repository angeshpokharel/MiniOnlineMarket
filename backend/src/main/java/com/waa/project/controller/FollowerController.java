package com.waa.project.controller;

import com.waa.project.dto.SellerDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.service.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/followers")
public class FollowerController {
    @Autowired
    FollowerService followerService;

    @GetMapping("/following/{userId}")
    public List<SellerDTO> getAllFollowing(@PathVariable("userId") long userId){
        return followerService.getAllFollowing(userId);
    }

    @GetMapping("/unfollowing/{userId}")
    public List<SellerDTO> getAllUnfollowing(@PathVariable("userId") long userId){
        return followerService.getAllUnfollowing(userId);
    }

    @GetMapping("/{userId}")
    public List<SellerDTO> getAllFollower(@PathVariable("userId") long userId){
        return followerService.getAllFollower(userId);
    }

    @PostMapping
    public void follow(@RequestParam("by") long by,@RequestParam("to") long to) {
       followerService.follow(by, to);
    }

    @DeleteMapping
    public void unfollow(@RequestParam("by") long by,@RequestParam("to") long to) {
        followerService.unFollow(by, to);
    }
}

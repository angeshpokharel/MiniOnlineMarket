package com.waa.project.controller;

import com.waa.project.constants.SecurityConstants;
import com.waa.project.dto.SellerDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.service.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/followers")
public class FollowerController {
    @Autowired
    FollowerService followerService;

    @GetMapping("/following/{userId}")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_BUYER + "')")
    public List<SellerDTO> getAllFollowing(@PathVariable("userId") long userId){
        return followerService.getAllFollowing(userId);
    }

    @GetMapping("/unfollowing/{userId}")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_BUYER + "')")
    public List<SellerDTO> getAllUnfollowing(@PathVariable("userId") long userId){
        return followerService.getAllUnfollowing(userId);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_BUYER + "')")
    public List<SellerDTO> getAllFollower(@PathVariable("userId") long userId){
        return followerService.getAllFollower(userId);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_BUYER + "')")
    public void follow(@RequestParam("by") long by,@RequestParam("to") long to) {
       followerService.follow(by, to);
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_BUYER + "')")
    public void unfollow(@RequestParam("by") long by,@RequestParam("to") long to) {
        followerService.unFollow(by, to);
    }
}

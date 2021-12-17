package com.waa.project.service;

import com.waa.project.dto.SellerDTO;

import java.util.List;

public interface FollowerService {
    void follow(long by, long to);
    List<SellerDTO> getAllFollowing(long userId);
    List<SellerDTO> getAllUnfollowing(long userId);
    List<SellerDTO> getAllFollower(long userId);
    void unFollow(long by, long to);
}

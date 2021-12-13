package com.waa.project.service;

import com.waa.project.domain.Follower;
import com.waa.project.domain.User;
import com.waa.project.dto.SellerDTO;
import com.waa.project.repository.FollowerRepository;
import com.waa.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FollowerServiceImpl implements  FollowerService{
    @Autowired
    FollowerRepository followerRepository;
    
    @Autowired
    UserRepository userRepository;

    @Override
    public void follow(long by, long to) {
        Boolean isExist = false;
        for (Follower follower : followerRepository.findAll()) {
            if(follower.getFollowedBy() == by && follower.getFollowedTo()==to){
                isExist=true;
                break;
            }
        }

        if(!isExist) {
            Follower f = new Follower();
            f.setFollowedBy(by);
            f.setFollowedTo(to);
            followerRepository.save(f);
        }
    }

    @Override
    public List<SellerDTO> getAllFollowing(long userId){
        List<SellerDTO> result = new ArrayList<>();
        for(Follower f : followerRepository.findAll()){
            if(f.getFollowedBy() == userId){
                User user = userRepository.findById(f.getFollowedTo()).get();
                SellerDTO s = new SellerDTO();
                s.setId(user.getId());
                s.setEmail(user.getEmail());
                s.setName(user.getName());
                s.setAddress(user.getAddress());
                s.setPhone(user.getPhone());
                result.add(s);
            }
        }
        return result;
    }

    @Override
    public List<SellerDTO> getAllFollower(long userId){
        List<SellerDTO> result = new ArrayList<>();
        for(Follower f : followerRepository.findAll()){
            if(f.getFollowedTo() == userId){
                User user = userRepository.findById(f.getFollowedBy()).get();
                SellerDTO s = new SellerDTO();
                s.setId(user.getId());
                s.setEmail(user.getEmail());
                s.setName(user.getName());
                s.setAddress(user.getAddress());
                s.setPhone(user.getPhone());
                result.add(s);
            }
        }
        return result;
    }
}

package com.waa.project.service;

import com.waa.project.domain.Product;
import com.waa.project.domain.Review;
import com.waa.project.domain.User;
import com.waa.project.dto.AdminReviewDTO;
import com.waa.project.dto.ProductDTO;
import com.waa.project.dto.ReviewDTO;
import com.waa.project.repository.ProductRepository;
import com.waa.project.repository.ReviewRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ModelMapper modelMapper;

    ReviewServiceImpl(ReviewRepository reviewRepository, ModelMapper modelMapper) {
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void save(ReviewDTO reviewDTO) {
        Review review = convertToEntity(reviewDTO);
        reviewRepository.save(review);
    }

    @Override
    public List<ReviewDTO> getAll() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public ReviewDTO getById(long id) {
        return convertToDTO(reviewRepository.findById(id).get());
    }

    @Override
    public void delete(long id) {
        reviewRepository.deleteById(id);
    }

    /*@Override
    public void update(long id, ReviewDTO reviewDTO) {
        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            review.setMessage(reviewDTO.getMessage());
            review.setRating(reviewDTO.getRating());
            review.setIsApproved(reviewDTO.getIsApproved());

            reviewRepository.save(review);
        }
    }*/

    @Override
    public List<ReviewDTO> findByProductId(long id) {
        List<Review> reviews = reviewRepository.findAll().stream().filter(x -> x.getProductId() == id).
                collect(Collectors.toList());
        return reviews.stream().map(this::convertToDTO).collect(Collectors.toList());
    }


    private Review convertToEntity(ReviewDTO reviewDTO) {
        return modelMapper.map(reviewDTO, Review.class);
    }

    private ReviewDTO convertToDTO(Review review) {
        return modelMapper.map(review, ReviewDTO.class);
    }

    public List<AdminReviewDTO> findUnApprovedReviews(){
        List<AdminReviewDTO> result = new ArrayList<>();
        List<Review> reviews = reviewRepository.findAll().stream().filter(r->r.getIsApproved() == false).collect(Collectors.toList());
        for(Review review : reviews){
            AdminReviewDTO ard = new AdminReviewDTO();
            ard.setId(review.getId());
            ard.setProductId(review.getProductId());
            Product  p = productRepository.findById(review.getProductId()).get();
            ard.setProductName(p.getName());
            ard.setMessage(review.getMessage());
            result.add(ard);
        }
        return result;
    }

    public List<AdminReviewDTO> findApprovedReviews(){
        List<AdminReviewDTO> result = new ArrayList<>();
        List<Review> reviews = reviewRepository.findAll().stream().filter(r->r.getIsApproved() == true).collect(Collectors.toList());
        for(Review review : reviews){
            AdminReviewDTO ard = new AdminReviewDTO();
            ard.setId(review.getId());
            ard.setProductId(review.getProductId());
            Product  p = productRepository.findById(review.getProductId()).get();
            ard.setProductName(p.getName());
            ard.setMessage(review.getMessage());
            result.add(ard);
        }
        return result;
    }

    @Override
    public void update(long id) {
        Review review = reviewRepository.findById(id).get();
        review.setIsApproved(true);
        reviewRepository.save(review);
    }
}

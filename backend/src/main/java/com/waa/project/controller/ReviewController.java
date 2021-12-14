package com.waa.project.controller;

import com.waa.project.dto.ReviewDTO;
import com.waa.project.repository.ReviewRepository;
import com.waa.project.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private final ReviewService reviewService;

    ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<ReviewDTO> findAll() {
        return new ResponseEntity(reviewService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> findById(@PathVariable("id") long id) {
        return new ResponseEntity(reviewService.getById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ReviewDTO reviewDTO) {
        reviewService.save(reviewDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") long id, @RequestBody ReviewDTO reviewDTO) {
        reviewService.update(id, reviewDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        reviewService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/productId/{id}")
    public ResponseEntity<List<ReviewDTO>> getByProductId(@PathVariable("id") long id) {
        var result =  reviewService.findByProductId(id);
        System.out.println(result);
       return new ResponseEntity(result,HttpStatus.OK);
    }
}

package com.waa.project.controller;

import com.waa.project.dto.UserDTO;
import com.waa.project.service.CartService;
import com.waa.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  @Autowired
  CartService cartService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<UserDTO> saveUser(@Valid @RequestBody UserDTO  userDTO) {
    UserDTO result = null;
    if (null != userService.getUserByEmail(userDTO.getEmail())) {
      ResponseEntity.badRequest();
    }
    else {
      //added this code to create a new cart with empty items-by win
      result = userService.save(userDTO);
      if(userDTO.getRole().equals("ROLE_BUYER"))
        cartService.createCartByUserId(result.getId());
    }
    return ResponseEntity.ok(result);
  }

  @GetMapping
  public ResponseEntity<List<UserDTO>> getAllUsers() {
    return ResponseEntity.ok(userService.getAll());
  }

  @GetMapping("/un-approved")
  public ResponseEntity<List<UserDTO>> getAllUnApprovedUsers() {
    return ResponseEntity.ok(userService.getAllUnApprovedUser());
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserDTO> getUser(@PathVariable("id") long id) {
    return ResponseEntity.ok(userService.getUserById(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteUser(@PathVariable("id") long id){
    return ResponseEntity.ok(userService.deleteUserById(id));
  }

  @PutMapping
  public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody UserDTO  userDTO) {
    return ResponseEntity.ok(userService.save(userDTO));
  }

  @PutMapping("/approve/{id}")
  public ResponseEntity<UserDTO> approveSeller(@PathVariable long id) {
    return ResponseEntity.ok(userService.approveSeller(id));
  }

}

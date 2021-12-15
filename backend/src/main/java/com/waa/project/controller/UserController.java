package com.waa.project.controller;

import com.waa.project.dto.UserDTO;
import com.waa.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<UserDTO> saveUser(@RequestBody UserDTO  userDTO) {
    if (null != userService.getUserByEmail(userDTO.getEmail())) {
      ResponseEntity.badRequest();
    }
    return ResponseEntity.ok(userService.save(userDTO));
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

  @PutMapping("/{id}")
  public ResponseEntity<UserDTO> updateUserName(@RequestParam String name, @PathVariable long id) {
    return ResponseEntity.ok(userService.updateFullName(id, name));
  }

  @PutMapping("/approve/{id}")
  public ResponseEntity<UserDTO> approveSeller(@PathVariable long id) {
    return ResponseEntity.ok(userService.approveSeller(id));
  }

}

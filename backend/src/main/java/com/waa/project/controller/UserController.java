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

  @GetMapping("/{id}")
  public ResponseEntity<UserDTO> getUser(@PathVariable("id") long id) {
    return ResponseEntity.ok(userService.getUserById(id));
  }

  @DeleteMapping
  public ResponseEntity<Boolean> deleteUser(@RequestParam("id") long id){
    return ResponseEntity.ok(userService.deleteUserById(id));
  }

  @PutMapping
  public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO  userDTO) {
    return ResponseEntity.ok(userService.save(userDTO));
  }


}

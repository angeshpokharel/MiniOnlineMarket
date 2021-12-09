package com.waa.project.controller;

import com.waa.project.dto.UserDTO;
import com.waa.project.service.UserService;
import java.util.List;
import javax.naming.CannotProceedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    userService.save(userDTO);
    return ResponseEntity.ok(userDTO);
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

package com.waa.project.service;

import com.waa.project.domain.User;
import com.waa.project.dto.UserDTO;
import java.util.List;

public interface UserService {
  UserDTO save(UserDTO userDTO);
  List<UserDTO> getAll();
  User getUserByEmail(String email);
  UserDTO convertToDTO(User user);
}

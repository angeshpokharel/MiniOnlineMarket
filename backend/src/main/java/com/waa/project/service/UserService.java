package com.waa.project.service;

import com.waa.project.domain.User;
import com.waa.project.dto.UserDTO;
import java.util.List;

public interface UserService {
  UserDTO save(UserDTO userDTO);
  List<UserDTO> getAll();
  User getUserByEmail(String email);
  UserDTO getUserById(long id);
  public boolean deleteUserById(long id);
  UserDTO convertToDTO(User user);

  UserDTO getUserByUserName(String userName);
  UserDTO updateFullName(long id, String name);

  List<UserDTO> getAllUnApprovedUser();

  UserDTO approveSeller(long id);
}

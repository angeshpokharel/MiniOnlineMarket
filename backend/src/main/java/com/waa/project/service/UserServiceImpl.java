package com.waa.project.service;

import com.waa.project.domain.User;
import com.waa.project.dto.UserDTO;
import com.waa.project.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

  private final UserRepository userRepository;
  ModelMapper modelMapper = new ModelMapper();

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  public void save(UserDTO userDTO) {
    User user = convertToEntity(userDTO);
    userRepository.save(user);
  }

  @Override
  public List<UserDTO> getAll() {
    List<User> users = (List<User>) userRepository.findAll();
    return users.stream().map(this::convertToDTO).collect(Collectors.toList());
  }


  private User convertToEntity(UserDTO userDTO) {
    return modelMapper.map(userDTO, User.class);
  }

  private UserDTO convertToDTO(User user) {
    return modelMapper.map(user, UserDTO.class);
  }

  @Override
  public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
    User user = getUserByEmail(userEmail);
    if (user != null) {
      return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
              AuthorityUtils.commaSeparatedStringToAuthorityList(user.getRole()));
    } else {
      throw new UsernameNotFoundException(userEmail);
    }
  }

  @Override
  public User getUserByEmail(String userEmail) {
    return appUserRepository.findByEmail(userEmail);
  }

  @Override
  public UserDTO getUserById(long id) {
    return convertToDTO(appUserRepository.findById(id));
  }


  public boolean deleteUserById(long id) {
    try {
      appUserRepository.deleteById(id);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

}

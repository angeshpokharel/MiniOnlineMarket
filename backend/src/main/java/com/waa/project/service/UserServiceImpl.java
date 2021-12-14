package com.waa.project.service;

import com.waa.project.domain.User;
import com.waa.project.dto.UserDTO;
import com.waa.project.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

  private final UserRepository appUserRepository;
  PasswordEncoder passwordEncoder;
  ModelMapper modelMapper = new ModelMapper();

  @Autowired
  public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.appUserRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }


  @Override
  public UserDTO save(UserDTO userDTO) {
    if  (userDTO == null) {
      return null;
    }
    User appUser = convertToEntity(userDTO);
    if (0 != appUser.getId()) {
      appUser.setModifiedDate(System.currentTimeMillis());
    } else {
      appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
      appUser.setCreatedDate(System.currentTimeMillis());
    }
    appUserRepository.save(appUser);
    return convertToDTO(appUser);
  }

  @Override
  public List<UserDTO> getAll() {
    List<User> users = (List<User>) appUserRepository.findAll();
    return users.stream().map(this::convertToDTO).collect(Collectors.toList());
  }


  public User convertToEntity(UserDTO userDTO) {
    return modelMapper.map(userDTO, User.class);
  }

  public UserDTO convertToDTO(User user) {
    return modelMapper.map(user, UserDTO.class);
  }

  @Override
  public UserDTO getUserByUserName(String userName) {
    return null;
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
    return convertToDTO(appUserRepository.findById(id).get());
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

package com.waa.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
  private long id;
  private String email;
  private String name;
  private String address;
  private String phone;
  private String password;
  private String role; //csv -> comma separated value
}

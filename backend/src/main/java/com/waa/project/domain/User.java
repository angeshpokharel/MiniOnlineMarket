package com.waa.project.domain;


import javax.persistence.*;

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
@Entity
public class User {
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private long id;
  private String name;
  private String address;
  private String phone;
  private String password;
  private long roleId;

  @OneToOne(mappedBy="user", cascade = CascadeType.ALL)
  private Cart cart;
}

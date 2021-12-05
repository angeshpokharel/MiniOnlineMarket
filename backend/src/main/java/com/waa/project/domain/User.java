package com.waa.project.domain;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

  @JsonManagedReference
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @Fetch(FetchMode.JOIN)
  private List<Order> orders;
}

package com.waa.project.response;

import com.waa.project.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * LoginResponse class holds login related response attributes
 *
 * @author Sayal
 * @version 1.0.0
 * @since 28 Nov 2019
 */
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ToString
public class LoginResponse implements ApiResponse {
  private String type;
  private String token;
  private String role;
  private String message;
  private UserDTO appUser;
}

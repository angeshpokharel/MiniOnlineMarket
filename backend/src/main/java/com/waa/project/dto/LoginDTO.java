package com.waa.project.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * Login Class to map user details while logged in
 *
 * @version 1.0.0
 */
@Setter
@Getter
public class LoginDTO {

    @NotNull
    @Email
    private String userEmail;
    @NotNull
    private String password;
    private boolean rememberMe;
}
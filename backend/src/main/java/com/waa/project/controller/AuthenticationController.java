package com.waa.project.controller;

import com.waa.project.constants.ResponseMessageConstant;
import com.waa.project.constants.SecurityConstants;
import com.waa.project.domain.User;
import com.waa.project.dto.LoginDTO;
import com.waa.project.response.LoginResponse;
import com.waa.project.response.LogoutResponse;
import com.waa.project.service.UserService;
import com.waa.project.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserService appUserService;

    @Autowired
    public AuthenticationController(JwtUtils jwtUtils,
                                    AuthenticationManager authenticationManager, UserService appUserService) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.appUserService = appUserService;
    }

    @PostMapping("/login")
    public LoginResponse returnLoginResponse(@RequestBody LoginDTO login) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    login.getEmail(), login.getPassword());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            String role = authentication.getAuthorities().toString();
            role = role.substring(1, role.indexOf("]"));
            String token = jwtUtils.generateJwtToken(authentication, login.isRememberMe());
            JwtUtils.addToken(token);
            User appUser = new User();
            if (!login.getEmail().equals(SecurityConstants.SUPER_ADMIN_EMAIL)) {
                appUser = appUserService.getUserByEmail(login.getEmail());
            }
            return new LoginResponse(ResponseMessageConstant.SUCCESS, token, role, ResponseMessageConstant.SUCCESS_LOGIN,
                    appUserService.convertToDTO(appUser));
        } catch (AuthenticationException ex) {
            return new LoginResponse(ResponseMessageConstant.ERROR, "", "", ResponseMessageConstant.FAILURE_LOGIN, null);
        }
    }

    @GetMapping("/logout")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_ADMIN + "','" + SecurityConstants.ROLE_USER + "')")
    public LogoutResponse logout(HttpServletRequest req) {
        JwtUtils.removeToken(JwtUtils.getToken(req));
        return new LogoutResponse(ResponseMessageConstant.SUCCESS, ResponseMessageConstant.SUCCESS_LOGOUT);
    }
}
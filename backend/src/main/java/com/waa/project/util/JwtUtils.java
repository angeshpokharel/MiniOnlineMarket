package com.waa.project.util;

import com.waa.project.constants.SecurityConstants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

  private static List<String> jwtTokens = new ArrayList<>();

  public static void addToken(String token) {
    jwtTokens.add(token);
  }

  public static boolean isValidToken(String token) {
    return jwtTokens.contains(token);
  }

  public String generateJwtToken(Authentication authentication, boolean rememberMe) {

    long validityDay = rememberMe ? 864000000 : 36000000;
    List<String> roles = authentication.getAuthorities()
        .stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList());
    byte[] signingKey = SecurityConstants.JWT_SECRET.getBytes();

    String token = Jwts.builder()
        .signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
        .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
        .setIssuer(SecurityConstants.TOKEN_ISSUER)
        .setAudience(SecurityConstants.TOKEN_AUDIENCE)
        .setSubject(authentication.getName())
        .setExpiration(new Date(System.currentTimeMillis() + validityDay))
        .claim("rol", roles)
        .compact();

    return SecurityConstants.TOKEN_PREFIX + token;
  }

  public static void removeToken(String token) {
    if (isValidToken(token)) {
      jwtTokens.remove(token);
    }
  }

  public static String getToken(HttpServletRequest request) {
    return request.getHeader(SecurityConstants.TOKEN_HEADER);
  }

}
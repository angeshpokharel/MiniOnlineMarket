package com.waa.project.config;


import com.waa.project.security.JwtAuthorizationFilter;
import com.waa.project.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.servlet.support.csrf.CsrfRequestDataValueProcessor;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.support.RequestDataValueProcessor;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Value("${mom.super.user.username}")
  private String superAdminUsername;
  @Value("${mom.super.user.password}")
  private String superAdminPassword;
  private final UserServiceImpl appUserService;

  @Autowired
  public SecurityConfiguration(@Lazy UserServiceImpl appUserService) {
    this.appUserService = appUserService;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors().and()
        .authorizeRequests()
        .antMatchers("/", "/h2-console/**").permitAll()
        .antMatchers("/api/public/**").permitAll()
        .antMatchers("/api/login").permitAll()
        .antMatchers("/api/**/**").permitAll()
        .antMatchers("/resources/**").permitAll()
        .antMatchers("/uploads/**").permitAll()
        .antMatchers("/error").permitAll()
        .antMatchers("/unauthorized").permitAll()
        .antMatchers("/users/**").permitAll()
        .antMatchers("/carts/**").permitAll()
        .antMatchers("/followers/**").permitAll()
        .antMatchers("/general/**").permitAll()
        .antMatchers("/orders/**").permitAll()
        .antMatchers("/products/**").permitAll()
            .antMatchers("/categories/**").permitAll()
            .antMatchers("/reviews/**").permitAll()
        .antMatchers("/api/seller/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SELLER")
        .antMatchers("/api/user/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")
        .antMatchers("/404").permitAll()
        .anyRequest().authenticated()
        .and()
        .logout()
        .logoutRequestMatcher(
            new AntPathRequestMatcher("/login?logout"))
        .logoutSuccessUrl("/").permitAll()
        .and().csrf().disable()
        .addFilter(new JwtAuthorizationFilter(authenticationManager()))
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    http.headers().frameOptions().sameOrigin();
  }

  @Bean
  public RequestDataValueProcessor requestDataValueProcessor() {
    return new CsrfRequestDataValueProcessor();
  }

  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {

    auth.inMemoryAuthentication()
        .withUser(superAdminUsername)
        .password(passwordEncoder().encode(superAdminPassword))
        .authorities("ROLE_ADMIN");

    auth.userDetailsService(appUserService);
  }


  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.applyPermitDefaultValues();
    corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "OPTIONS"));
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}

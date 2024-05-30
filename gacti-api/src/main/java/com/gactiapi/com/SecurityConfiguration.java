package com.gactiapi.com;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
    http.csrf(csrf -> csrf.disable())
      .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
      .authorizeHttpRequests(request -> request.requestMatchers("/users/register").permitAll())
      .authorizeHttpRequests(request -> request.requestMatchers("/users/login").permitAll())
      .authorizeHttpRequests(request -> request.requestMatchers("/swagger-ui/**","/v3/api-docs/**").permitAll())
      .authorizeHttpRequests(request -> request.requestMatchers("/**").permitAll())

    ;

    return http.build();
  }
}

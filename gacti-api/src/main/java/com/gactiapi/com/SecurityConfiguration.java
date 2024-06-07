package com.gactiapi.com;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

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
      .authorizeHttpRequests(request -> request.requestMatchers("http://localhost:4200/home").permitAll())


    ;
    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOrigins(List.of("http://localhost:4200"));
    configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));
    configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**",configuration);

    return source;
  }
}

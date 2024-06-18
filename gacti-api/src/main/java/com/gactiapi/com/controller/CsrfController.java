package com.gactiapi.com.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class CsrfController {

  @GetMapping("/csrf/token")
  public CsrfToken csrf(CsrfToken token){
    return token;
  }
}

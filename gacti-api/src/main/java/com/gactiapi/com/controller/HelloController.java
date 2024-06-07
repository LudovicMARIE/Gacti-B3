package com.gactiapi.com.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class HelloController {

  @GetMapping("/api/")
  public String index(){
    return "Hello world";
  }
}

package net.codewyre.taskify.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

public class KeycloakSecuredController {
  public Jwt getJwt() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return (Jwt)auth.getPrincipal();
  }

  public String getEmail() {
    return this.getJwt().getClaim("email");
  }

  public String getFullname() {
    return this.getJwt().getClaim("name");
  }

  public String getFirstName() {
    return this.getJwt().getClaim("given_name");
  }

  public String getLastName() {
    return this.getJwt().getClaim("family_name");
  }

  public String getUserId() {
    return this.getJwt().getSubject();
  }
}
